import React, { useContext, useEffect } from 'react';
import CustomDrawer from '../components/CustomDrawer';
import DrustvoScreen from '../screens/DrawerHomeScreens/DrustvoScreen';
import HidrantiScreen from '../screens/DrawerHomeScreens/HidrantiScreen';
import HidrantiMapScreen from '../screens/DrawerHomeScreens/HidrantiMapScreen';
import NastavitveScreen from '../screens/DrawerHomeScreens/NastavitveScreen';
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

export default function HomeScreenNavigation() {
  const theme = useSelector((state : any) => state.theme);
  const authContext = useContext(AuthContext);
 

  //najprej naredi neko random društvo in na mesto šestke prilepi njen id sem not...lahko je bilakaj 
  useEffect(() => {
    const updateUserDrustvo = async () => {
      try {
        await api.put(`${BASE_URL}/user/setdrustvo/${authContext?.userInfo?.user_info?.id}/1`);
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
      <Drawer.Screen name="Društva" component={DrustvoScreen} options={{
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
