import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL_AUTH, BASE_URL_HIDRANT, BASE_URL_HIDRANT_PREGLED} from '../config';
import { createTable, insertData, clearTable} from '../local_storage/SQLite';
import api from './../services/api';

interface UserInfo {
  id: number;
}

interface User {
  [x: string]: any;
  user: any;
  username: string;
  user_info: UserInfo;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ContextProps {
  isLoading: boolean;
  userInfo: User | null;
  splashLoading: boolean;
  accessToken: string | null;
  register: (username: string, password: string) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthContext = createContext<ContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [accessToken, SetAccessToken] = useState<string>('');

  const register = (username: string, password: string) => {
    setIsLoading(true);

    axios
      .post<AuthResponse>(`${BASE_URL_AUTH}signup`, {
        username,
        password,
      })
      .then(res => {
        const userInfo = res.data.user;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        //console.log("USER!!", userInfo)
        setIsLoading(false);
        //console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post<AuthResponse>(`${BASE_URL_AUTH}signin`, {
        username,
        password,
      });
      const userInfo = response.data.user;
      const accessToken = response.data.accessToken;
      SetAccessToken(accessToken);
      setUserInfo(userInfo);
      const userInfoWithAccessToken = { ...userInfo, accessToken }; // Include accessToken in the userInfo object
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfoWithAccessToken)); // Store the userInfo object with accessToken
      // Create tables
      createTable();  
      // Insert user data into the SQLite table
      await insertData('user', {
        id: userInfo.user_info.id,
        username: userInfo.username,
        drustvoId: 1,
        role: userInfo.role,
      });
      // Fetch data from API
      api.get(`${BASE_URL_HIDRANT}`)
      .then(response => {
        const hidrantData = response.data; // Assuming the response data is an array of hidrant objects

        // Save the fetched hidrant data to the SQLite table
        hidrantData.forEach((hidrant: any) => {
          // Assuming hidrant has properties like title, location, description, status, etc.
          insertData('hidrant', {
            title: hidrant.title,
            location: hidrant.location,
            description: hidrant.description,
            status: hidrant.status,
            nadzemni: hidrant.nadzemni,
            lat: hidrant.lat,
            lng: hidrant.lng,
            createdDate: hidrant.createdDate,
            zadnjiPregled: hidrant.zadnjiPregled,
            drustvoId: hidrant.drustvoId
          }).then(() => {
            console.log('Hidrant data inserted into SQLite table');
          }).catch(error => {
            console.error('Error inserting hidrant data into SQLite table:', error);
          });
        });
         // Fetch pregledi data from API
        api.get(`${BASE_URL_HIDRANT_PREGLED}`)
        .then(preglediResponse => {
          const preglediData = preglediResponse.data; // Assuming the response data is an array of pregledi objects
        
          // Save the fetched pregledi data to the SQLite table
          preglediData.forEach((pregled: any) => {
            // Assuming pregled has properties like hidrantId, date, status, etc.
            insertData('pregled', {
              opis: pregled.opis,
              status: pregled.status,
              createdDate: pregled.createdDate,
              userId: pregled.userId,
              hidrantId: pregled.hidrantId
            }).then(() => {
              console.log('Pregled data inserted into SQLite table');
            }).catch(error => {
              console.error('Error inserting pregled data into SQLite table:', error);
            });
          });
        })
        .catch(preglediError => {
          console.error('Error fetching pregledi data from API:', preglediError);
        });

      })
    .catch(error => {
      console.error(error);
    });
      setIsLoading(false);
      //console.log("Sem se vpisal");
      //console.log(userInfo.user.accessToken);
      return true;
    } catch (error) {
      console.log(`login error: ${error}`);
      setIsLoading(false);
      alert('Napačno uporabniško ime ali geslo!');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
  
    try {
      // Clear SQLite tables
      await clearTable('user'); // Clear the 'user' table
      await clearTable('hidrant'); // Clear the 'hidrant' table
      await clearTable('pregled'); // Clear the 'pregled' table
      await clearTable('drustvo'); // Clear the 'drustvo' table
  
  
      AsyncStorage.removeItem('userInfo');
      setUserInfo(null);
      SetAccessToken(null);
    } catch (e) {
      console.log(`logout error: ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let storedUserInfo = await AsyncStorage.getItem('userInfo');
      const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) as User : null;

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        accessToken,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};