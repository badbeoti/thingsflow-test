import React, { useEffect } from 'react';
import { IssuesContext } from '../contexts/Issues';
import { getIssuesList } from '../api/issues';
import { Linking } from 'react-native';
import { AD_URL } from '../assets/link';

export const sleep = (ms: number) =>
  new Promise((resolve: any) => setTimeout(resolve, ms));

const useHome = () => {
  const { issues, setIssues, isLoading, setIsLoading } =
    React.useContext(IssuesContext);

  useEffect(() => {
    fetchInitIssuesList();
  }, []);

  const fetchInitIssuesList = async () => {
    setIsLoading(true);

    await sleep(3000);

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

  const openAdUrl = () => {
    Linking.openURL(AD_URL);
  };

  return { issues, openAdUrl, isLoading };
};

export default useHome;
