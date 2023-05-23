import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/navigation/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import { Provider } from 'react-redux';
import configureStore from './src/redux_store/store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { UseConnectivity } from './src/hooks/UseConnectivity';
// Initialize the store
const store = configureStore();

const App = () => {

  UseConnectivity();
  
  return (
    <AuthProvider>
      <Provider store={store}>
        <>
          <StatusBar backgroundColor="#FC8A17" />
          <Navigation />
          <Toast />
        </>
      </Provider>
    </AuthProvider>
  );
};

export default App;