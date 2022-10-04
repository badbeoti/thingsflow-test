import React, { useCallback, useEffect } from 'react';
import { Linking } from 'react-native';

import { IssuesContext } from '../contexts/Issues';
import { getIssuesList } from '../api/issues';
import { AD_URL } from '../assets/link';
import { useNavigation } from '@react-navigation/native';

const DEFAULT_PAGE = 1;

const useHome = () => {
  const { issues, setIssues, setIsLoading, setIssueDetail } =
    React.useContext(IssuesContext);

  const navigation = useNavigation();

  const goToDetail = (index: number) => {
    setIssueDetail(issues[index]);

    navigation.navigate('Detail');
  };

  const [currentPage, setCurrentPage] = React.useState<number>(DEFAULT_PAGE);
  const handleSetCurrentPage = () => setCurrentPage(prev => prev + 1);
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const handleSetErrorMsg = (msg: string) => setErrorMsg(msg);

  useEffect(() => {
    fetchInitIssuesList();
  }, []);

  useEffect(() => {
    if (currentPage > DEFAULT_PAGE) {
      fetchNextIssuesList();
    }
  }, [currentPage]);

  const fetchInitIssuesList = async () => {
    setIsLoading(true);

    try {
      const res = await getIssuesList();
      const newIssues = res.data.map((e: any, i: number) => {
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
      newIssues.splice(4, 0, { title: 'ad' });
      setIssues(newIssues);

      setIsLoading(false);
    } catch (e) {
      handleSetErrorMsg('Error: error msg');
      setIsLoading(false);
    }
  };

  const fetchNextIssuesList = useCallback(async () => {
    setIsLoading(true);

    try {
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
    } catch (e) {
      handleSetErrorMsg('Error: error msg');
      setIsLoading(false);
    }
  }, [currentPage]);

  const openAdUrl = () => {
    Linking.openURL(AD_URL);
  };

  return {
    openAdUrl,
    handleSetCurrentPage,
    goToDetail,
    errorMsg,
    handleSetErrorMsg,
  };
};

export default useHome;
