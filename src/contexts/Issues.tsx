import React, { createContext, ReactNode } from 'react';

export type Issue = {
  id: number;
  title: string;
  body: string;
  updated_at: string;
  comments: number;
  user: {
    login: string;
    avatar_url: string;
  };
};

export const IssuesContext: React.Context<{
  issueDetail: Issue;
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
}> = createContext({
  issueDetail: {} as Issue,
  issues: [] as Issue[],
  setIssues: (issues: Issue[]) => {},
});

export const IssuesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [issueDetail, setIssueDetail] = React.useState<Issue | null>(null);
  const [issues, setIssues] = React.useState<Issue[]>([]);
  const handleSetIssueDetail = (issue: Issue) => setIssueDetail(issue);
  const handleSetIssues = (issues: Issue[]) => setIssues(issues);

  const value = React.useMemo(
    () => ({
      issues,
      setIssues: handleSetIssues,
      issueDetail,
      setIssueDetail: handleSetIssueDetail,
    }),
    [issues, handleSetIssues],
  );

  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
};
