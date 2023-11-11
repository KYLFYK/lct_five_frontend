import React, {useEffect, useState} from 'react';
import {Steps, Timeline, Typography} from 'antd';
import {statusToPresentation, videoToPresentation} from '../../utils/testing-utils';
import {TStatisticByStage, TTestByUserStatistic} from '../../types/stats';
import {BASE_DATE_FORMAT_STRING} from "../../constants/patterns";
import dayjs from "dayjs";
import styled from "@emotion/styled";


type TTestStepProps = {
    test: TTestByUserStatistic,
    testIndex: number,
}

const StepWrapper = styled("div")`
  padding: 20px;
`;
const DescriptionWrapper = styled("div")`
  padding-top: 40px;
  display: block;
`;
const DetailsWrapper = styled("div")`
  display: inline-block;
`;
const VideoWrapper = styled('div')`
padding: 20px;
`;

export const TestStep = ({ test }: TTestStepProps) => {
    const [current, setCurrent] = useState(0);
    const [selectedStats, setSelectedStats] = useState<(TStatisticByStage | undefined)>();

    useEffect(() => {
        setSelectedStats(test.stagesStats[0]);
    }, [test]);

    return (<StepWrapper key={test.testId}>
        <Typography.Title>{test.testId}</Typography.Title>

        <Steps
            key={test.testId}
            onChange={(value) => {
                setCurrent(value);
                setSelectedStats(
                    test.stagesStats[value]
                );
                console.log(selectedStats);
            }}
            current={current}
            items={test.stagesStats.map((stage) => ({
                title: statusToPresentation(stage.status),
                description:
                    stage.status === "complete"
                        ? `Дата завершения: ${dayjs(
                            stage.dateComplete
                        ).format(BASE_DATE_FORMAT_STRING)}`
                        : stage.status === "in-progress"
                            ? `Дата начала: ${dayjs(
                                stage.dateOpen
                            ).format(BASE_DATE_FORMAT_STRING)}`
                            : "",
                status:
                    stage.status === "time-end" ||
                    stage.status === "failure"
                        ? "error"
                        : stage.status === "in-progress"
                            ? "process"
                            : stage.status === "not-started"
                                ? "wait"
                                : "finish",
            }))}
        />
        <DescriptionWrapper>
            <Typography.Text style={{ marginBottom: 8 }}>
                Начало прохождения вопросов: {dayjs(selectedStats?.questionsStartDate).format(BASE_DATE_FORMAT_STRING) || 'N/A'}
            </Typography.Text>
            <br/>
            <Typography.Text style={{ marginBottom: 8 }}>
                Окончание прохождения вопросов: {dayjs(selectedStats?.questionsCompleteDate).format(BASE_DATE_FORMAT_STRING) || 'N/A'}
            </Typography.Text>
            <br/>
            <Typography.Text style={{ marginBottom: 8 }}>
                Дедлайн: {dayjs(selectedStats?.stageDeadLine).format(BASE_DATE_FORMAT_STRING)}
            </Typography.Text>
            <br/>

        {selectedStats?.videoStats?.map((video, index) => (
            <DetailsWrapper key={index}>

                    <br />
                    <Typography.Text>Длительность: {video.duration}</Typography.Text>
                    <br />
                    <Typography.Text>Статус: {videoToPresentation(video.status)}</Typography.Text>
                    <VideoWrapper>
                        {video.status !=="not-started" && <Timeline
                            items={[
                                {
                                    color: 'blue',
                                    children: `Начало: ${dayjs(video.playStartDate).format(BASE_DATE_FORMAT_STRING)}`,
                                },
                                ...(video.pausesDates
                                        ? video.pausesDates.map((pause, index) => ({
                                            color: 'black',
                                            children: (
                                                <>
                                                    <Typography.Text>
                                                        Пауза {index + 1}:
                                                    </Typography.Text>
                                                    <br/>
                                                    <Typography.Text>
                                                        начало паузы: {dayjs(pause.start).format(BASE_DATE_FORMAT_STRING)}
                                                    </Typography.Text>
                                                    <br/>
                                                    <Typography.Text>
                                                        конец паузы: {dayjs(pause.end).format(BASE_DATE_FORMAT_STRING)}
                                                    </Typography.Text>
                                                </>
                                            )
                                        }))
                                        : []
                                ),
                                ...(video.status !== 'in-progress'
                                        ? [
                                            {
                                                color: 'blue',
                                                children: `Конец: ${video.playCompleteDate || 'N/A'}`,
                                            },
                                        ]
                                        : []
                                ),
                            ]}
                        />}

                    </VideoWrapper>
            </DetailsWrapper>
        ))}
        </DescriptionWrapper>
    </StepWrapper>)
}

export default TestStep;
