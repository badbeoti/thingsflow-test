import React, { useEffect } from 'react';
import styled from '@emotion/native';
import { ScrollView, StatusBar } from 'react-native';
import useHome from '../hooks/useHome';
import IssueList from '../components/IssueList';

const HomeScreen = () => {
  const { issues } = useHome();

  console.log(issues);

  return (
    <HomeSafeAreaView>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <IssueList />
      </ScrollView>
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
