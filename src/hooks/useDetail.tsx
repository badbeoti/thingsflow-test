import React from 'react';
import { IssuesContext } from '../contexts/Issues';

const useDetail = () => {
  const { issueDetail, setIssueDetail } = React.useContext(IssuesContext);

  return { issueDetail };
};

export default useDetail;
