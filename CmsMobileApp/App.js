import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Sentry from '@sentry/react-native';
import {SentryEnvVars} from "./EnvVars";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./App/Screens/Home";
import Section from "./App/Screens/Section";
import Detail from "./App/Screens/Detail";
import Contact from "./App/Screens/Contact";
import About from "./App/Screens/About";

Sentry.init({ 
  dsn: SentryEnvVars.dsn,
  enableNative: false
});

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>

            <Stack.Screen
                name="Home"
                options={{ title: 'Home' }}>
                {props => <Home {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="About"
                options={{ title: 'About' }}>
                {props => <About {...props}  />}
            </Stack.Screen>

            <Stack.Screen
                name="Contact"
                options={{ title: 'Contact' }}>
                {props => <Contact {...props}  />}
            </Stack.Screen>

            <Stack.Screen
                name="Detail"
                options={({ route }) => ({ title: route.params.Title })}>
                {props => <Detail {...props}  />}
            </Stack.Screen>

            <Stack.Screen
                name="Section"
                options={({ route }) => ({ title: route.params.Title })}>
                {props => <Section {...props}  />}
            </Stack.Screen>



        </Stack.Navigator>
        <View>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
