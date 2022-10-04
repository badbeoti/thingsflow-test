import React from 'react';
import type { Node } from 'react';
import { StyleSheet } from 'react-native';
import RootStack from './src/navigations/RootStack';
import { IssuesProvider } from './src/contexts/Issues';

const App: () => Node = () => {
  return (
    <IssuesProvider>
      <RootStack />
    </IssuesProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
