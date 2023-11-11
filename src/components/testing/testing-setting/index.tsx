import styled from '@emotion/styled';import { Button } from 'antd';import { FC, useCallback, useEffect, useRef, useState } from 'react';import { useTestEditContext } from '../../../context/testing/test-edit-context';import {  TNode,  TQuestion,  TTestBaseSettings,  TTestEditAreaTab,  TTestStage,} from '../../../types/tests';import { EStageTabs } from '../stage-tabs';import { TestingWrapper } from '../testing-preview';import { FullDescriptionSettings } from './full-description-settings';import { MainSettings } from './main-settings';import { QuestionsSettings } from './questions-settings';type TProps = {  currentTab: TTestEditAreaTab | string;  selectedStage?: TTestStage;  stageTab: EStageTabs;  handleSaveAll: () => void;};const SaveWrapper = styled('div')`  margin-top: 22px;  display: flex;  align-items: center;  justify-content: center;`;const Wrapper = styled(TestingWrapper)`  position: sticky;  top: 40px;`;export const TestingSetting: FC<TProps> = ({  currentTab,  stageTab,  selectedStage,  handleSaveAll,}) => {  const timeOutRef = useRef<NodeJS.Timeout>();  const [forceForm, setForceForm] = useState(true);  useEffect(() => {    setForceForm(false);    timeOutRef.current = setTimeout(() => {      setForceForm(true);    }, 1);  }, [currentTab, stageTab]);  const {    editBaseSettings,    editStages,    editQuestions,    questions,    baseSettings,  } = useTestEditContext();  const handleEditBaseSettingField: <T extends keyof TTestBaseSettings>(    key: T,    value: TTestBaseSettings[T]  ) => void = useCallback((key, value) => {    editBaseSettings((prev) => ({      ...prev,      [key]: value || undefined,    }));  }, []);  const handleFormChange: <T extends keyof TTestBaseSettings>(    objValue: Record<T, TTestBaseSettings[T]>,    values: TTestBaseSettings  ) => void = useCallback((objValue, values) => {    const key = Object.keys(objValue)[0] as keyof typeof objValue;    // @ts-ignore    if (key === 'stages') {      // @ts-ignore      const newStages: TTestStage[] = values.stages;      const foundIds: string[] = [];      editStages((prevStages) => {        return [          ...prevStages            .map((el) => {              const existed = newStages.find((newSt) => newSt.id === el.id);              foundIds.push(el.id);              if (existed) {                return {                  ...el,                  ...existed,                };              }              return el;            })            .filter((el) => !!newStages.find((newSt) => newSt.id === el.id)),          ...newStages.filter((el) => !foundIds.includes(el.id)),        ];      });    } else {      handleEditBaseSettingField(key, objValue[key]);    }  }, []);  const handleEditStage = useCallback(    (key: any, value: any) => {      editStages((prev) =>        prev.map((el) => {          if (el.id === selectedStage?.id) {            return {              ...el,              [key]: value,            };          }          return el;        })      );    },    [selectedStage]  );  const handleEditStageDescription = useCallback(    (desc: TNode[]) => {      handleEditStage('descriptionFull', desc);    },    [handleEditStage]  );  const handleEditStageQuestions = useCallback(    (quest: TQuestion[]) => {      handleEditStage('questions', quest);    },    [handleEditStage]  );  return (    <Wrapper>      {currentTab === TTestEditAreaTab.MAIN && (        <MainSettings handleFormChange={handleFormChange} />      )}      {currentTab === TTestEditAreaTab.FULL_DESCRIPTION && forceForm && (        <FullDescriptionSettings          nodes={baseSettings.descriptionFull}          onEdit={(newDesc) => {            editBaseSettings((prev) => ({              ...prev,              descriptionFull: newDesc,            }));          }}        />      )}      {currentTab === TTestEditAreaTab.QUESTIONS && forceForm && (        <QuestionsSettings          onFormChange={(a, values) => {            editQuestions(values.questions);          }}          initialValues={{            questions: questions,          }}        />      )}      {currentTab.includes(TTestEditAreaTab.STAGE) && (        <>          {stageTab === EStageTabs.DESCRIPTION &&            selectedStage &&            forceForm && (              <FullDescriptionSettings                nodes={selectedStage.descriptionFull}                onEdit={handleEditStageDescription}              />            )}          {stageTab === EStageTabs.QUESTIONS && selectedStage && forceForm && (            <QuestionsSettings              onFormChange={(a, values) => {                handleEditStageQuestions(values.questions);              }}              initialValues={{                questions: selectedStage.questions,              }}            />          )}        </>      )}      <SaveWrapper>        <Button type="primary">Сохранить тестирование</Button>      </SaveWrapper>    </Wrapper>  );};