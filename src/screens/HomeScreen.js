import React, { useContext, useState, useEffect } from 'react';
import DrustvoScreen from './DrawerHomeScreens/DrustvoScreen';
import HidrantiScreen from './DrawerHomeScreens/HidrantiScreen';
import HidrantiMapScreen from './DrawerHomeScreens/HidrantiMapScreen';
import { AuthContext } from '../context/AuthContext';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import HttpInterceptor from '../services/HttpInterceptor';
import api from '../services/api';
import { BASE_URL } from '../config';





const Drawer = createDrawerNavigator();

export default function HomeScreen() {

  const { userInfo } = useContext(AuthContext);
  console.log(userInfo.user.user_info.id)

  //najprej naredi neko random društvo in na mesto šestke prilepi njen ip sem not...lahko je bilakaj 
  useEffect(() => {
    HttpInterceptor(userInfo.accessToken);
    api.put(`${BASE_URL}/user/setdrustvo/${userInfo.user.user_info.id}/6`)
    
  }, []);
  

  const {logout} = useContext(AuthContext);

  function CustomDrawerContent(props){
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Odjava" onPress={logout} />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator initialRouteName='DrustvoList' drawerContent={props => <CustomDrawerContent {...props}/>}>
      <Drawer.Screen name="Mapa" component={HidrantiMapScreen} />
      <Drawer.Screen name="Drustva" component={DrustvoScreen} />
      <Drawer.Screen name="Hidranti" component={HidrantiScreen} />
    </Drawer.Navigator>
  );
}