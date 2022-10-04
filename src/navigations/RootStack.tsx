import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'Angular / Angular-cli',
          }}
        />
        <Stack.Screen
          name="List"
          component={HomeScreen}
          options={{
            headerTitle: 'Angular / Angular-cli',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
