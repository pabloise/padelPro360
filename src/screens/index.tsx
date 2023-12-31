import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import OwnerRegister from './OwnerRegister';
import OwnerHome from './OwnerHome';

const Stack = createNativeStackNavigator();

export const MainNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OwnerRegister" component={OwnerRegister} />
        <Stack.Screen name="OwnerHome" component={OwnerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
