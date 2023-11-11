import { Paths } from '../constants/paths';const getAbsoluteStartPath = () => {  return `${window.location.protocol}//${window.location.host}`;};export const getTestPassingLink = (testId: string, absolute?: boolean) => {  const path = `${Paths.TEST}/${testId}`;  if (absolute) {    return getAbsoluteStartPath() + path;  }  return path;};export const getTestEditLink = (testId: string, absolute?: boolean) => {  const path = `${Paths.TEST}/${testId}${Paths.TEST_EDIT}`;  return absolute ? getAbsoluteStartPath() + path : path;};export const getTestCreateLink = (absolute?: boolean) => {  const path = `${Paths.TEST}/create`;  return absolute ? getAbsoluteStartPath() + path : path;};export const getEmployersPassingLink = (userId?: string, absolute?: boolean) => {  const path = `${Paths.EMPLOYERS}/${userId ? userId : ""}`;  if (absolute) {    return getAbsoluteStartPath() + path;  }  return path;};export const getStatPassingLink = (recordId?: string, absolute?: boolean) => {  const path = `${Paths.STATISTIC}/${recordId ? recordId : ""}`;  if (absolute) {    return getAbsoluteStartPath() + path;  }  return path;};