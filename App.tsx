import React from 'react';
import type { Node } from 'react';
import RootStack from './src/navigations/RootStack';
import { IssuesProvider } from './src/contexts/Issues';

const App: () => Node = () => {
  return (
    <IssuesProvider>
      <RootStack />
    </IssuesProvider>
  );
};

export default App;
