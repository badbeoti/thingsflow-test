import React, { useEffect } from 'react';
import styled from '@emotion/native';
import { ScrollView, StatusBar } from 'react-native';
import { IssuesContext } from '../contexts/Issues';
import { getIssuesList } from '../api/issues';

const HomeScreen = () => {
  const { issues, setIssues } = React.useContext(IssuesContext);

  const fetchIssuesList = async () => {
    const res = await getIssuesList();
    const newIssues = res.data.map((e: any) => {
      return {
        id: e.number,
        title: e.title,
        body: e.body,
        updated_at: e.updated_at,
        user: {
          login: e.user.login,
          avatar_url: e.user.avatar_url,
        },
      };
    });
    setIssues(newIssues);
  };

  useEffect(() => {
    fetchIssuesList();
  }, []);
  console.log(issues);

  return (
    <HomeSafeAreaView>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} />
    </HomeSafeAreaView>
  );
};

export default HomeScreen;

const HomeSafeAreaView = styled.SafeAreaView({
  paddingHorizontal: 16,
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#1C1C1C',
});
