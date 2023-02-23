// view component
import { StatusBar } from 'expo-status-bar';
// component state management
import { useEffect, useState } from 'react';
// view component
import { StyleSheet, Text, View, Button } from 'react-native'; 
// redux hooks
import { useSelector, useDispatch } from 'react-redux'; 
// actions
import { switchMode } from '../../redux_store/actions';

import {lightTheme, darkTheme} from '../../styles/ThemesStyle';

export default function NastavitveScreen() {
  // get the current theme
  const theme = useSelector(state => state.theme);
  // initialize action dispatcher
  const dispatch = useDispatch();
  // define a component mode state
  const [mode, setMode] = useState(theme.mode);

  const handleThemeChange = () => { 
    
    dispatch(switchMode(theme.mode === 'light' ? {
      mode: 'dark',
      style: darkTheme
  } : {
    mode: 'light',
    style: lightTheme
}));
}

// Update the app Incase the theme mode changes
/*useEffect(() => { 
    setMode(theme.mode);
}, [theme]);*/

// Render a view with different style classes depending on the theme mode

return (
    <View style={theme.style.container}>
        <Text style={theme.style.container}></Text>
        <Button title="Switch Mode" onPress={handleThemeChange} />
        <StatusBar style="auto" />
    </View>
);
}

const styles = StyleSheet.create({
  container_light: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  }

  ,
  container_dark: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
  }

  ,
  text_light: {
      marginBottom: 20,
      color: '#000'
  }

  ,
  text_dark: {
      marginBottom: 20,
      color: "#fff"
  }
}

);



