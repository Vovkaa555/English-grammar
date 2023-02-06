import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import TestListScreen from './Screens/TestListScreen';
import TestScreen from './Screens/TestScreen';
import SearchScreen from './Screens/SearchScreen';
import Styles from './App.module.scss';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="TestList" component={TestListScreen} style={Styles.details} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
