import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenNavigation from './HomeScreenNavigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext, ContextProps } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import ModalScreenHidranti from '../screens/ModalScreenHidranti';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const {splashLoading } = useContext(AuthContext) as ContextProps;
  const authContext = useContext(AuthContext);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : authContext?.accessToken ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreenNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Hidrant"
              component={ModalScreenHidranti}
              options={{ title: 'Hidrant' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;