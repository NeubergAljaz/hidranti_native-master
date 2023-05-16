import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenNavigation from './HomeScreenNavigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext, ContextProps } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import ModalScreenHidranti from '../screens/ModalScreenHidranti';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const {splashLoading } = useContext(AuthContext) as ContextProps;
  const authContext = useContext(AuthContext);
  const theme = useSelector((state: any) => state.theme);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{ headerShown: false, headerStyle: theme.style.headerStyle, headerTitleStyle: theme.style.headerTitleStyle}}
          />
        ) : authContext?.accessToken ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreenNavigation}
              options={{ headerShown: false, headerStyle: theme.style.headerStyle, headerTitleStyle: theme.style.headerTitleStyle}}
            />
            <Stack.Screen
              name="Hidrant"
              component={ModalScreenHidranti}
              options={{ title: 'Hidrant', headerStyle: theme.style.headerStyle, headerTitleStyle: theme.style.headerTitleStyle}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false, headerStyle: theme.style.headerStyle, headerTitleStyle: theme.style.headerTitleStyle}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false, headerStyle: theme.style.headerStyle, headerTitleStyle: theme.style.headerTitleStyle}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;