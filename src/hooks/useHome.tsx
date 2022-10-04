import React, { useEffect } from 'react';
import { IssuesContext } from '../contexts/Issues';
import { getIssuesList } from '../api/issues';
import { Linking } from 'react-native';
import { AD_URL } from '../assets/link';

const useHome = () => {
  const { issues, setIssues } = React.useContext(IssuesContext);

  useEffect(() => {
    fetchInitIssuesList();
  }, []);

  const fetchInitIssuesList = async () => {
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
  };

  const openAdUrl = () => {
    Linking.openURL(AD_URL);
  };

  return { issues, openAdUrl };
};

export default useHome;
