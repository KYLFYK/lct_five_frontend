import styled from '@emotion/styled';import { FC, useCallback } from 'react';import { useTestEditContext } from '../../../context/testing/test-edit-context';import {  TTestBaseSettings,  TTestEditAreaTab,  TTestStage,} from '../../../types/tests';import { TestingWrapper } from '../testing-preview';import { FullDescriptionSettings } from './full-description-settings';import { MainSettings } from './main-settings';import { QuestionsSettings } from './questions-settings';type TProps = {  currentTab: TTestEditAreaTab | string;};const Wrapper = styled(TestingWrapper)`  position: sticky;  top: 40px;`;export const TestingSetting: FC<TProps> = ({ currentTab }) => {  const { editBaseSettings, editStages, editQuestions, questions } =    useTestEditContext();  const handleEditBaseSettingField: <T extends keyof TTestBaseSettings>(    key: T,    value: TTestBaseSettings[T]  ) => void = useCallback((key, value) => {    editBaseSettings((prev) => ({      ...prev,      [key]: value || undefined,    }));  }, []);  const handleFormChange: <T extends keyof TTestBaseSettings>(    objValue: Record<T, TTestBaseSettings[T]>,    values: TTestBaseSettings  ) => void = useCallback((objValue, values) => {    const key = Object.keys(objValue)[0] as keyof typeof objValue;    // @ts-ignore    if (key === 'stages') {      // @ts-ignore      const newStages: TTestStage[] = values.stages;      const foundIds: string[] = [];      editStages((prevStages) => {        return [          ...prevStages            .map((el) => {              const existed = newStages.find((newSt) => newSt.id === el.id);              foundIds.push(el.id);              if (existed) {                return {                  ...el,                  ...existed,                };              }              return el;            })            .filter((el) => !!newStages.find((newSt) => newSt.id === el.id)),          ...newStages.filter((el) => !foundIds.includes(el.id)),        ];      });    } else {      handleEditBaseSettingField(key, objValue[key]);    }  }, []);  return (    <Wrapper>      {currentTab === TTestEditAreaTab.MAIN && (        <MainSettings handleFormChange={handleFormChange} />      )}      {currentTab === TTestEditAreaTab.FULL_DESCRIPTION && (        <FullDescriptionSettings />      )}      {currentTab === TTestEditAreaTab.QUESTIONS && (        <QuestionsSettings          onFormChange={(a, values) => {            editQuestions(values.questions);          }}          initialValues={{            questions: questions,          }}        />      )}    </Wrapper>  );};