import React, { useContext, useEffect } from 'react';
import CustomDrawer from '../components/CustomDrawer';
import DrustvoScreen from './DrawerHomeScreens/DrustvoScreen';
import HidrantiScreen from './DrawerHomeScreens/HidrantiScreen';
import HidrantiMapScreen from './DrawerHomeScreens/HidrantiMapScreen';
import NastavitveScreen from './DrawerHomeScreens/NastavitveScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../context/AuthContext';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import api from '../services/api';
import { BASE_URL } from '../config';
import { useSelector} from 'react-redux'; 


const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  const theme = useSelector(state => state.theme);
  const { userInfo } = useContext(AuthContext);
 

  //najprej naredi neko random društvo in na mesto šestke prilepi njen id sem not...lahko je bilakaj 
  useEffect(() => {
    const updateUserDrustvo = async () => {
      try {
        await api.put(`${BASE_URL}/user/setdrustvo/${userInfo.user.user_info.id}/4`);
        console.log("Drustvo updated successfully!");
      } catch (error) {
        console.error("Error updating user drustvo: ", error, "ignoriraj zaenkrat, ne vem zakaj je ta error ampak vseeno dela");
      }
    };
  
    updateUserDrustvo();
  }, []);
  

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} screenOptions={theme.style.screenOptions} initialRouteName='DrustvoList'>
      <Drawer.Screen name="Mapa" component={HidrantiMapScreen} options={{
        drawerIcon: () => (
          <Ionicons name='map-outline' size={22} style={theme.style.listIcon}/>
        )
      }}/>
      <Drawer.Screen name="Drustva" component={DrustvoScreen} options={{
        drawerIcon: () => (
          <Ionicons name='home-outline' size={22} style={theme.style.listIcon}/>
        )
      }}/>
      <Drawer.Screen name="Hidranti" component={HidrantiScreen} options={{
        drawerIcon: () => (
          <MaterialCommunityIcons name='fire-hydrant' size={22} style={theme.style.listIcon}/>
        )
      }}/>
      <Drawer.Screen name="Nastavitve" component={NastavitveScreen} options={{
        drawerIcon: () => (
          <Ionicons name='settings-outline' size={22} style={theme.style.listIcon}/>
        )
      }}/>
    </Drawer.Navigator> 
  );
}
