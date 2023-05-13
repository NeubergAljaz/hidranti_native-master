import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL_AUTH} from '../config';

interface UserInfo {
  id: number;
  address: string | null;
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
  const [accessToken, SetAccessToken] = useState<string | null>(null);

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
        console.log("USER!!", userInfo)
        setIsLoading(false);
        console.log(userInfo);
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
      setUserInfo(userInfo);
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      SetAccessToken(response.data.accessToken);
      setIsLoading(false);
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