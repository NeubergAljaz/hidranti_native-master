import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import { Provider } from 'react-redux';
import configureStore from './src/redux_store/store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

// Initialize the store
const store = configureStore();

const App = () => {
  return (

    <AuthProvider>
    <Provider store={store}>
      <>
        <StatusBar backgroundColor="#06bcee" />
        <Navigation />
        <Toast />
      </>
    </Provider>
  </AuthProvider>
    

  );
};

export default App;