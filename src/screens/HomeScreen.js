import React, { useContext, useEffect } from 'react';
import DrustvoScreen from './DrawerHomeScreens/DrustvoScreen';
import HidrantiScreen from './DrawerHomeScreens/HidrantiScreen';
import HidrantiMapScreen from './DrawerHomeScreens/HidrantiMapScreen';
import NastavitveScreen from './DrawerHomeScreens/NastavitveScreen';
import { AuthContext } from '../context/AuthContext';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import api from '../services/api';
import { BASE_URL } from '../config';

const Drawer = createDrawerNavigator();

export default function HomeScreen() {

  const { userInfo } = useContext(AuthContext);
 

  //najprej naredi neko random društvo in na mesto šestke prilepi njen id sem not...lahko je bilakaj 
  useEffect(() => {
    const updateUserDrustvo = async () => {
      try {
        await api.put(`${BASE_URL}/user/setdrustvo/${userInfo.user.user_info.id}/6`);
        console.log("Drustvo updated successfully!");
      } catch (error) {
        console.error("Error updating user drustvo: ", error, "ignoriraj zaenkrat, ne vem zakaj je ta error ampak vseeno dela");
      }
    };
  
    updateUserDrustvo();
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
      <Drawer.Screen name="Nastavitve" component={NastavitveScreen} />
    </Drawer.Navigator> 
  );
}