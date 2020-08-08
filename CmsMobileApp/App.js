import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Sentry from '@sentry/react-native';
import {SentryEnvVars} from "./EnvVars";
import {ReportSentryError} from "./App/DataAccess";

Sentry.init({ 
  dsn: SentryEnvVars.dsn,
  enableNative: false
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>I AM CARSON AND I AM A POTATO</Text>
      <StatusBar style="auto" />
    </View>
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
