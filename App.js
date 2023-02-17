import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import {ThemeProvider} from './src/context/ThemeContext';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StatusBar backgroundColor="#06bcee" />
        <Navigation />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;