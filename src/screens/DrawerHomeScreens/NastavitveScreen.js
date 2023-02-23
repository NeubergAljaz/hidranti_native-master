import React from 'react';
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

export default function NastavitveScreen() {
  // get the current theme
  const theme = useSelector(state => state.theme);
  // initialize action dispatcher
  const dispatch = useDispatch();
  // define a component mode state
  //const [mode, setMode] = useState(theme.mode);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleThemeChange = () => { 
    
    dispatch(switchMode(theme.mode === 'light' ? {
      mode: 'dark',
      style: darkTheme
      } : {
        mode: 'light',
        style: lightTheme
    }));

    onToggleSwitch();
}

return (
    <View style={theme.style.container}>
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
    </View>
);
}




