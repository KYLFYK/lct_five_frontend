import { Tabs } from 'antd';import { FC } from 'react';import { TTestStage } from '../../types/tests';export enum EStageTabs {  DESCRIPTION = 'DESCRIPTION',  QUESTIONS = 'QUESTIONS',}type TProps = {  stage: TTestStage;  activeTab: EStageTabs;  onTabChange: (tab: EStageTabs) => void;};const tabs = [  {    key: EStageTabs.DESCRIPTION,    label: 'Полное описание',  },  {    key: EStageTabs.QUESTIONS,    label: 'Вопросы этапа',  },];export const StageTabs: FC<TProps> = ({ activeTab, onTabChange }) => {  return (    <Tabs      tabPosition="top"      activeKey={activeTab}      items={tabs}      onChange={onTabChange as any}    />  );};