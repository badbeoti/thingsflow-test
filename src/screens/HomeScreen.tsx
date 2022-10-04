import React, { useEffect } from 'react';
import styled from '@emotion/native';
import { StatusBar, Text } from 'react-native';
import useHome from '../hooks/useHome';
import IssueList from '../components/IssueList';
import { IssuesContext } from '../contexts/Issues';

const HomeScreen = () => {
  const { isLoading } = React.useContext(IssuesContext);

  return (
    <HomeSafeAreaView>
      <StatusBar barStyle="light-content" />
      {isLoading ? (
        <LoadingContainer>
          <Text>Loading...</Text>
        </LoadingContainer>
      ) : (
        <></>
      )}
      <IssueList />
    </HomeSafeAreaView>
  );
};

export default HomeScreen;

const HomeSafeAreaView = styled.SafeAreaView({
  paddingHorizontal: 16,
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const LoadingContainer = styled.View({
  zIndex: 999,
  flex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
});
