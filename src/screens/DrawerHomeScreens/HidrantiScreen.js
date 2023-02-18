import React, { useContext } from 'react'
import {View,Text} from 'react-native';

import GetHidranti from '../../components/GetHidranti';
import { lightTheme, darkTheme } from '../../styles/ThemesStyle';
import ThemeContext from '../../context/ThemeContext';

export default function HidrantiScreen() {
  const { isDarkModeEnabled} = useContext(ThemeContext);

  return (
    <View style={isDarkModeEnabled ? darkTheme.container : lightTheme.container}>
    <GetHidranti/>
   
    </View>
  );
}