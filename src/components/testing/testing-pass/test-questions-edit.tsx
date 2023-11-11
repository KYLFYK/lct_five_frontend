import { FC, useEffect, useState } from 'react';import { useTestPassContext } from '../../../context/testing/test-pass-context';import { TTestStage } from '../../../types/tests';import { QuestionItem } from '../testing-questions';type TProps = {  currentStageItem: TTestStage;};export const TestQuestionsEdit: FC<TProps> = ({ currentStageItem }) => {  const { setStageQuestionsComplete } = useTestPassContext();  const [answers, setAnswers] = useState<Record<string, string>>({});  useEffect(() => {    if (      Object.values(answers).filter(Boolean).length ===      currentStageItem.questions.length    ) {      setStageQuestionsComplete((prev) => ({        ...prev,        [currentStageItem.id]: {          ...prev[currentStageItem.id],          questionsComplete: true,        },      }));    } else {      setStageQuestionsComplete((prev) => ({        ...prev,        [currentStageItem.id]: {          ...prev[currentStageItem.id],          questionsComplete: false,        },      }));    }  }, [currentStageItem]);  return (    <div>      {currentStageItem.questions.map((el) => (        <QuestionItem key={el.id} question={el} setQuestionData={setAnswers} />      ))}    </div>  );};