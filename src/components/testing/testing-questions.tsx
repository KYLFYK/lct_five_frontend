import styled from '@emotion/styled';import { Empty, Select } from 'antd';import Space from 'antd/lib/space';import { FC, useMemo } from 'react';import { TQuestion } from '../../types/tests';import { sortByOptionalOrder } from '../../utils/common';import { nodeComponentByType } from '../../utils/testing-utils';import { TestingWrapper } from './testing-preview';type TProps = {  fullPage?: boolean;  questions: TQuestion[];};const QuestionWrapper = styled('div')`  border: 1px solid ${({ theme }) => theme.COLORS.WHITE.C300};  padding: 12px;  border-radius: 12px;  margin-bottom: 18px;`;const QuestionItem: FC<{ question: TQuestion }> = ({ question }) => {  const isMultiple = useMemo(() => {    let result = false;    let count = 0;    question.variants.forEach((variant) => {      if (variant.correct) {        count++;      }      if (count > 1) {        result = true;      }    });    return result;  }, [question]);  const options = useMemo(    () =>      question.variants.map((el) => ({        label: el.label,        value: el.id,      })),    [question]  );  return (    <QuestionWrapper>      <Space direction={'vertical'} size={0}>        <Space direction="vertical" size={12}>          {question.question.sort(sortByOptionalOrder).map((node) => (            <div key={`quest-node-${node.key}`}>              {nodeComponentByType(node)}            </div>          ))}        </Space>        <Select          placeholder="Выберите ответ"          mode={isMultiple ? 'multiple' : undefined}          options={options}        />      </Space>    </QuestionWrapper>  );};export const TestingQuestions: FC<TProps> = ({ fullPage, questions }) => {  return (    <TestingWrapper className={fullPage ? 'full-page' : ''}>      {questions.map((el) => (        <QuestionItem key={el.id} question={el} />      ))}      {questions.length === 0 && (        <Empty          image={Empty.PRESENTED_IMAGE_SIMPLE}          description="Вопросы отсутствуют"        />      )}    </TestingWrapper>  );};