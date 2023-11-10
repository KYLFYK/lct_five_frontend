export enum TTestEditAreaTab {  MAIN = 'main',  FULL_DESCRIPTION = 'descriptionFull',}export type TListedTest = {  id: string;  title: string;  description: string;  createDate: string;  updateDate: string;};export type TTabledTest = {  key: string;} & TListedTest;export type TTestingStatus =  | 'complete'  | 'failure'  | 'in-progress'  | 'not-started'  | 'time-end';export type TNodeType = 'title' | 'text' | 'image' | 'video';export type TNode = {  type?: TNodeType;  key?: string;  value?: string;  order?: number;  level?: 1 | 2 | 3 | 4 | 5;  videoViewingGuarantee?: boolean;};export type TTestBaseSettings = {  title?: string;  descriptionShort?: string;  descriptionFull: TNode[];};export type TQuestion = {  question: TNode[];  multiple?: boolean;  variants: {    label: string;    correct?: boolean;  };};export type TTestStage = {  id: string;  title?: string;  descriptionShort?: string;  descriptionFull: TNode[];  questions: TQuestion[];  order?: number;  deadLine?: string;};export type TTesting = {  id: string;  createDate: string;  updateDate: string;  baseInfo: TTestBaseSettings;  stages: TTestStage[];};