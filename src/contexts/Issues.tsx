import React, { createContext, ReactNode } from 'react';

type Issue = {
  id: number;
  title: string;
  body: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
};

export const IssuesContext: React.Context<{
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
}> = createContext({
  issues: [] as Issue[],
  setIssues: (issues: Issue[]) => {},
});

export const IssuesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [issues, setIssues] = React.useState<Issue[]>([]);
  const handleSetIssues = (issues: Issue[]) => setIssues(issues);

  const value = React.useMemo(
    () => ({ issues, setIssues: handleSetIssues }),
    [issues, handleSetIssues],
  );

  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
};
