import { authInstance } from './setUpAxios';

export const GET_ISSUES_LIST =
  '/repos/angular/angular-cli/issues?sort=comments';
export const getIssuesList = (page?: number) =>
  authInstance.get(`${GET_ISSUES_LIST}&page=${page || 1}`);
