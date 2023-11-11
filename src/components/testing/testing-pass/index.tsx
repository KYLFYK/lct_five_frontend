import styled from '@emotion/styled';import { Button, Steps } from 'antd';import Space from 'antd/lib/space';import Typography from 'antd/lib/typography';import { FC, useCallback, useMemo, useState } from 'react';import {  TestPassContext,  useTestPassContext,} from '../../../context/testing/test-pass-context';import { TTestStage } from '../../../types/tests';import { sortByOptionalOrder } from '../../../utils/common';import { nodeComponentByType } from '../../../utils/testing-utils';import { QuestionItem } from '../testing-questions';import { TestQuestionsEdit } from './test-questions-edit';const BaseContent = styled('div')`  position: relative;  background-color: ${({ theme }) => theme.COLORS.WHITE.C100};  padding: 40px;  border-radius: 30px;  margin-bottom: 30px;  max-width: 800px;  @media (max-width: 767px) {    padding: 20px;    border-radius: 18px;  }`;const Wrapper = styled('div')`  background-color: ${({ theme }) => theme.COLORS.WHITE.C200};  min-height: 100vh;  padding: 60px;  @media (max-width: 767px) {    padding: 20px;  }`;const Inner = styled('div')`  margin: 0 auto;  max-width: 800px;  &.use-grid {    max-width: 1100px;    display: grid;    grid-template-columns: 4fr 2fr;    column-gap: 30px;  }`;const StartWrapper = styled('div')`  display: flex;  align-items: center;  justify-content: center;`;const TestingPassEmpty: FC = () => {  const {    test,    setCurrentStage,    onTestStart,    testingStarted,    currentStage,    stageComplete,    nextStage,  } = useTestPassContext();  const [currentStep, setCurrentStep] = useState<number | undefined>(undefined);  const steps = useMemo(() => {    const res: {      title: string;      description: string;      key: number;      id: string;      disabled: boolean;    }[] = [];    if (test && test.baseInfo.useStages) {      test.stages.forEach((stage, index) =>        res.push({          title: stage.title ?? 'Без названия',          description: stage.descriptionShort ?? 'Без описания',          key: index,          id: stage.id,          disabled: (currentStep ?? 0) < index,        })      );    }    return res;  }, [test, currentStep]);  const handleChangeStep = useCallback(    (step?: number) => {      if (step && step > (currentStep ?? 0)) {        return;      }      const stageAssociated = steps.find((el) => el.key === step);      if (stageAssociated) {        setCurrentStep(step);        setCurrentStage(stageAssociated.id);      }    },    [currentStep, steps]  );  const currentStageItem: TTestStage | undefined = useMemo(() => {    return currentStage      ? test?.stages?.find((el) => el.id === currentStage)      : undefined;  }, [currentStage, test]);  const thisStageQuestionsComplete: boolean | undefined = useMemo(() => {    return (      currentStageItem && stageComplete[currentStageItem.id]?.questionsComplete    );  }, [currentStageItem]);  return (    <Wrapper>      <Inner        className={          testingStarted && test && test.baseInfo.useStages ? 'use-grid' : ''        }      >        <div>          {test && (            <>              <BaseContent>                <Typography.Title level={3}>                  {test.baseInfo.title ?? 'Без названия'}                </Typography.Title>                {test.baseInfo.descriptionShort && (                  <Typography.Paragraph>                    {test.baseInfo.descriptionShort}                  </Typography.Paragraph>                )}              </BaseContent>              {!testingStarted && (                <>                  <BaseContent>                    {test && test.baseInfo.descriptionFull?.length > 0 && (                      <Space direction="vertical" size={12}>                        {test.baseInfo.descriptionFull                          .sort(sortByOptionalOrder)                          .map((node) => (                            <div key={node.key}>                              {nodeComponentByType(node)}                            </div>                          ))}                      </Space>                    )}                  </BaseContent>                  <StartWrapper>                    <Button type="primary" onClick={onTestStart} size={'large'}>                      Начать тестирование                    </Button>                  </StartWrapper>                </>              )}            </>          )}          {testingStarted &&            test &&            !test.baseInfo.useStages &&            test.questions.length > 0 && (              <div>                <BaseContent>                  {test.questions.map((el) => (                    <QuestionItem key={el.id} question={el} />                  ))}                </BaseContent>              </div>            )}          {testingStarted &&            test &&            test.baseInfo.useStages &&            currentStageItem && (              <div>                {currentStageItem.descriptionFull.length > 0 && (                  <BaseContent>                    <Space direction="vertical" size={12}>                      {currentStageItem.descriptionFull                        .sort(sortByOptionalOrder)                        .map((node) => (                          <div key={node.key}>{nodeComponentByType(node)}</div>                        ))}                    </Space>                  </BaseContent>                )}                {currentStageItem.questions.length > 0 && (                  <BaseContent>                    <TestQuestionsEdit currentStageItem={currentStageItem} />                    {thisStageQuestionsComplete && (                      <Button type={'primary'} onClick={nextStage}>                        Продолжить                      </Button>                    )}                  </BaseContent>                )}              </div>            )}        </div>        {testingStarted && test && test.baseInfo.useStages && (          <div>            <BaseContent>              <Steps                current={currentStep}                onChange={handleChangeStep}                items={steps}                direction="vertical"              />            </BaseContent>          </div>        )}      </Inner>    </Wrapper>  );};export const TestingPass: FC = () => {  return (    <TestPassContext>      <TestingPassEmpty />    </TestPassContext>  );};