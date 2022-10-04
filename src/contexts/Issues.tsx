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
  setIssueDetail: (issueDetail: Issue) => void;
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
  isLoading: boolean;
  setIsLoading: (boolean) => void;
}> = createContext({
  issueDetail: {} as Issue,
  setIssueDetail: (issueDetail: Issue) => {},
  issues: [] as Issue[],
  setIssues: (issues: Issue[]) => {},
  isLoading: false,
  setIsLoading: boolean => {},
});

export const IssuesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [issueDetail, setIssueDetail] = React.useState<Issue | null>(null);
  const [issues, setIssues] = React.useState<Issue[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleSetIssueDetail = (issue: Issue) => setIssueDetail(issue);
  const handleSetIssues = (issues: Issue[]) => setIssues(issues);
  const handleSetIsLoading = (boolean: boolean) => setIsLoading(boolean);

  const value = React.useMemo(
    () => ({
      issues,
      setIssues: handleSetIssues,
      issueDetail,
      setIssueDetail: handleSetIssueDetail,
      isLoading,
      setIsLoading: handleSetIsLoading,
    }),
    [
      issues,
      handleSetIssues,
      issueDetail,
      handleSetIssueDetail,
      isLoading,
      handleSetIsLoading,
    ],
  );

  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
};
