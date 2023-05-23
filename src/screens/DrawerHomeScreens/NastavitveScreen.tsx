import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseConnectivity } from '../../Hooks/useConnectivity';
// component state management
//import { useEffect, useState } from 'react';
// view component
import {View} from 'react-native'; 
import {
  List, Switch
} from 'react-native-paper';
// redux hooks
import { useSelector, useDispatch } from 'react-redux'; 
// actions
import { switchMode } from '../../redux_store/actions';
// themes
import {lightTheme, darkTheme} from '../../styles/ThemesStyle';
import Icon from 'react-native-vector-icons/Foundation';
export default function NastavitveScreen() {

  const isConnected = UseConnectivity();
  // get the current theme
  const theme = useSelector((state : any) => state.theme);
  // initialize action dispatcher
  const dispatch = useDispatch();
  // define a component mode state
  //const [mode, setMode] = useState(theme.mode);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  //const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

/*  const handleThemeChange = () => { 
    
    dispatch(switchMode(theme.mode === 'light' ? {
      mode: 'dark',
      style: darkTheme
      } : {
        mode: 'light',
        style: lightTheme
    }));

    onToggleSwitch();
}*/
const handleThemeChange = async () => {
  const newThemeMode = theme.mode === 'light' ? 'dark' : 'light';
  const newIsSwitchOn = !isSwitchOn;

  try {
    // Store the new switch state and theme mode in AsyncStorage
    await AsyncStorage.setItem('themeMode', newThemeMode);
    await AsyncStorage.setItem('isSwitchOn', JSON.stringify(newIsSwitchOn));
  } catch (error) {
    console.log('Error storing switch state:', error);
  }

  // Update the switch state immediately
  setIsSwitchOn(newIsSwitchOn);

  // Dispatch the theme switch action
  dispatch(switchMode({
    mode: newThemeMode,
    style: newThemeMode === 'light' ? lightTheme : darkTheme
  }));
};

React.useEffect(() => {
  const retrieveSwitchState = async () => {
    try {
      // Retrieve the switch state from AsyncStorage
      const storedSwitchState = await AsyncStorage.getItem('isSwitchOn');
      const parsedSwitchState = storedSwitchState ? JSON.parse(storedSwitchState) : false;

      // Update the switch state if it's different from the default value
      if (parsedSwitchState !== isSwitchOn) {
        setIsSwitchOn(parsedSwitchState);
      }
    } catch (error) {
      console.log('Error retrieving switch state:', error);
    }
  };

  retrieveSwitchState();
}, []);

return (
    <View style={theme.style.containerPadding}>
        <List.Item
          key="Dark Mode"
          title="Dark Mode"
          titleStyle={theme.style.listTitle}
          left={() => <List.Icon color={theme.style.listIcon.color} icon="brightness-4"/>}
          right={() => (
            <Switch
              value={isSwitchOn}
              onValueChange={handleThemeChange}
              color={theme.style.switch.color}
            />
          )}
        />

<List.Item
          key="Internet connection"
          title="Povezava z internetom"
          titleStyle={theme.style.listTitle}
          left={() => <></>}
          right={() => (
           (isConnected)?(<Icon name="web" size={40} color="green" />):(<Icon name="web" size={40} color="#900" />)
          )}
        />

    </View>
);
}



