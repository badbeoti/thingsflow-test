import React, { useCallback, useEffect } from 'react';
import { IssuesContext } from '../contexts/Issues';
import { getIssuesList } from '../api/issues';
import { Linking } from 'react-native';
import { AD_URL } from '../assets/link';
import { useNavigation } from '@react-navigation/native';

export const sleep = (ms: number) =>
  new Promise((resolve: any) => setTimeout(resolve, ms));

const DEFAULT_PAGE = 1;

const useHome = () => {
  const { issues, setIssues, isLoading, setIsLoading, setIssueDetail } =
    React.useContext(IssuesContext);

  const navigation = useNavigation();

  const goToDetail = (index: number) => {
    setIssueDetail(issues[index]);

    navigation.navigate('Detail');
  };

  const [currentPage, setCurrentPage] = React.useState<number>(DEFAULT_PAGE);
  const handleSetCurrentPage = () => setCurrentPage(prev => prev + 1);

  useEffect(() => {
    fetchInitIssuesList();
  }, []);

  useEffect(() => {
    fetchNextIssuesList();
  }, [currentPage]);

  const fetchInitIssuesList = async () => {
    setIsLoading(true);

    await sleep(1000);

    const res = await getIssuesList();
    const newIssues = res.data.map((e: any, i: number) => {
      if (i === 4) {
        return {
          title: 'ad',
        };
      }

      return {
        id: e.number,
        title: e.title,
        body: e.body,
        updated_at: e.updated_at,
        comments: e.comments,
        user: {
          login: e.user.login,
          avatar_url: e.user.avatar_url,
        },
      };
    });
    setIssues(newIssues);

    setIsLoading(false);
  };

  const fetchNextIssuesList = useCallback(async () => {
    setIsLoading(true);

    await sleep(1000);

    const res = await getIssuesList(currentPage + 1);
    const newIssues = res.data.map((e: any) => {
      return {
        id: e.number,
        title: e.title,
        body: e.body,
        updated_at: e.updated_at,
        comments: e.comments,
        user: {
          login: e.user.login,
          avatar_url: e.user.avatar_url,
        },
      };
    });
    setIssues([...issues, ...newIssues]);

    setIsLoading(false);
  }, [currentPage]);

  const openAdUrl = () => {
    Linking.openURL(AD_URL);
  };

  return { issues, openAdUrl, isLoading, handleSetCurrentPage, goToDetail };
};

export default useHome;
