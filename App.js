import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import { Provider } from 'react-redux';
import configureStore from './src/redux_store/store';


// Initialize the store
const store = configureStore();

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <StatusBar backgroundColor="#06bcee" />
        <Navigation />
      </Provider>
    </AuthProvider>
  );
};

export default App;