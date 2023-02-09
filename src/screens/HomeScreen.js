import React, { useContext, useState } from 'react';
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




const Drawer = createDrawerNavigator();

export default function HomeScreen() {

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