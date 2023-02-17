import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity} from 'react-native';
import { lightTheme, darkTheme } from '../../styles/ThemesStyle';
import ThemeContext from '../../context/ThemeContext';

export default function NastavitveScreen() {
    const { isDarkModeEnabled, setIsDarkModeEnabled } = useContext(ThemeContext);
  
    const handleProfilePress = () => {
      // Implement navigation to profile screen here
    };
  
    const handleDarkModeToggle = (value) => {
      setIsDarkModeEnabled(value);
    };
  
    return (
      <View style={isDarkModeEnabled ? darkTheme.container : lightTheme.container}>
        <TouchableOpacity style={isDarkModeEnabled ? darkTheme.option : lightTheme.option} onPress={handleProfilePress}>
          <Text style={isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText}>Profile</Text>
        </TouchableOpacity>
        <View style={isDarkModeEnabled ? darkTheme.option : lightTheme.option}>
          <Text style={isDarkModeEnabled ? darkTheme.optionText : lightTheme.optionText}>Dark mode</Text>
          <Switch value={isDarkModeEnabled} onValueChange={handleDarkModeToggle} />
        </View>
      </View>
    );
  }
  




