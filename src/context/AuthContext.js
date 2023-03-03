import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL_AUTH} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [accessToken, SetAccessToken] = useState(null);

  const register = (username, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL_AUTH}signup`, {
        username,
        password,
      })
      .then(res => {
        let userInfo = res.data;
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




  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL_AUTH}signin`, {
        username,
        password,
      });
      const userInfo = response.data;
      setUserInfo(userInfo);
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      SetAccessToken(userInfo.accessToken);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log(`login error: ${error}`);
      setIsLoading(false);
      alert('Napačno uporabniško ime ali geslo');
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
  
    try {
      AsyncStorage.removeItem('userInfo');
      setUserInfo({});
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

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

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