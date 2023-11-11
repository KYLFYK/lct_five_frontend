import styled from '@emotion/styled';

import Table from 'antd/lib/table';
import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {userColumns} from "../home-page/user-table";
import {TableProps as RcTableProps} from "rc-table/lib/Table";
import {TTabledUser, TUserStatistics} from "../../types/user";
import {getEmployersPassingLink} from "../../utils/route-utils";
import {useNavigate, useParams} from "react-router-dom";
import {EmployersDrawer} from "./EmployersDrawer";
const TableWrapper = styled('div')`
  width: 100%;
`;
const dataSource: RcTableProps<TTabledUser>['data'] = [
    {
        id: '1',
        key: '1',
        name: 'Виктор',
        surname: 'Пузиков',
        telegram: 'test',
        employmentDate: '2023-01-01T01:00:00Z',
        description: 'lorem ipsum dolor sit amet'
    },
    {
        id: '2',
        key: '2',
        name: 'Андрей',
        surname: 'Котиков',
        telegram: 'test',
        employmentDate: '2023-01-01T01:00:00Z',
        description: 'lorem ipsum dolor sit amet'
    },
    // Add more users if needed
];

const statisticSource: TUserStatistics = {
    userId: '1',
    userName: "Тест тестович",
    statistic: [
        {
            testId: 'TestId1',
            userId: '1',
            username: 'Пузиков Виктор Андреевич',
            status: 'complete',
            stagesStats: [
                {
                    stageId: 'StageId1',
                    status: 'complete',
                    questionsCompleted: '20',
                    dateOpen: '2023-01-01T00:00:00Z',
                    dateComplete: '2023-01-01T01:00:00Z',
                    videoStats: [
                        {
                            status: 'completed',
                            duration: 3600,
                            viewingGuarantee: true,
                            playStartDate: '2023-01-01T00:15:00Z',
                            playCompleteDate: '2023-01-01T00:45:00Z',
                            pausesDates: [
                                { start: '2023-01-01T00:30:00Z', end: '2023-01-01T00:35:00Z' },
                                { start: '2023-01-01T00:40:00Z', end: '2023-01-01T00:42:00Z' },
                                { start: '2023-01-01T00:50:00Z', end: '2023-01-01T00:55:00Z' },
                                { start: '2023-01-01T01:05:00Z', end: '2023-01-01T01:10:00Z' },
                                { start: '2023-01-01T01:15:00Z', end: '2023-01-01T01:20:00Z' },
                                { start: '2023-01-01T01:25:00Z', end: '2023-01-01T01:30:00Z' },
                                { start: '2023-01-01T01:35:00Z', end: '2023-01-01T01:40:00Z' },
                                { start: '2023-01-01T01:45:00Z', end: '2023-01-01T01:50:00Z' },
                                // Add more pausesDates if needed
                            ],
                            averageAttention: [
                                {value: 80},
                                {value: 75},
                                {value: 85},
                                {value: 90},
                            ],
                        },
                        {
                            status: 'completed',
                            duration: 3600,
                            viewingGuarantee: true,
                            playStartDate: '2023-01-01T00:15:00Z',
                            playCompleteDate: '2023-01-01T00:45:00Z',
                            pausesDates: [
                                { start: '2023-01-01T00:30:00Z', end: '2023-01-01T00:35:00Z' },
                                { start: '2023-01-01T00:40:00Z', end: '2023-01-01T00:42:00Z' },
                                { start: '2023-01-01T00:50:00Z', end: '2023-01-01T00:55:00Z' },
                                { start: '2023-01-01T01:05:00Z', end: '2023-01-01T01:10:00Z' },
                                { start: '2023-01-01T01:15:00Z', end: '2023-01-01T01:20:00Z' },
                                { start: '2023-01-01T01:25:00Z', end: '2023-01-01T01:30:00Z' },
                                { start: '2023-01-01T01:35:00Z', end: '2023-01-01T01:40:00Z' },
                                { start: '2023-01-01T01:45:00Z', end: '2023-01-01T01:50:00Z' },
                                // Add more pausesDates if needed
                            ],
                            averageAttention: [
                                {value: 80},
                                {value: 75},
                                {value: 85},
                                {value: 90},
                            ],
                        },
                        {
                            status: 'completed',
                            duration: 3600,
                            viewingGuarantee: true,
                            playStartDate: '2023-01-01T00:15:00Z',
                            playCompleteDate: '2023-01-01T00:45:00Z',
                            pausesDates: [
                                { start: '2023-01-01T00:30:00Z', end: '2023-01-01T00:35:00Z' },
                                { start: '2023-01-01T00:40:00Z', end: '2023-01-01T00:42:00Z' },
                                { start: '2023-01-01T00:50:00Z', end: '2023-01-01T00:55:00Z' },
                                { start: '2023-01-01T01:05:00Z', end: '2023-01-01T01:10:00Z' },
                                { start: '2023-01-01T01:15:00Z', end: '2023-01-01T01:20:00Z' },
                                { start: '2023-01-01T01:25:00Z', end: '2023-01-01T01:30:00Z' },
                                { start: '2023-01-01T01:35:00Z', end: '2023-01-01T01:40:00Z' },
                                { start: '2023-01-01T01:45:00Z', end: '2023-01-01T01:50:00Z' },
                                // Add more pausesDates if needed
                            ],
                            averageAttention: [
                                {value: 80},
                                {value: 75},
                                {value: 85},
                                {value: 90},
                            ],
                        },
                        // Add more video stats if needed
                    ],
                    stageDeadLine: '2023-01-01T02:00:00Z',
                    questionsStartDate: '2023-01-01T01:15:00Z',
                    questionsCompleteDate: '2023-01-01T01:45:00Z',
                },
                // Add more stages if needed
                {
                    stageId: 'StageId2',
                    status: 'in-progress',
                    questionsCompleted: '15',
                    dateOpen: '2023-01-01T02:00:00Z',
                    dateComplete: '2023-01-01T03:00:00Z',
                    videoStats: [
                        {
                            status: 'in-progress',
                            duration: 1800,
                            viewingGuarantee: true,
                            playStartDate: '2023-01-01T02:15:00Z',
                            // playCompleteDate: undefined, // Uncomment if the video is still in progress
                            pausesDates: [
                                {
                                    start: '2023-01-01T02:30:00Z',
                                    // end: undefined, // Uncomment if the pause is still in progress
                                },
                            ],
                            averageAttention: [
                                {value: 70},
                                {value: 65},
                                {value: 75},
                            ],
                        },
                        // Add more video stats if needed
                    ],
                    stageDeadLine: '2023-01-01T04:00:00Z',
                    questionsStartDate: '2023-01-01T03:15:00Z',
                    // questionsCompleteDate: undefined, // Uncomment if the questions are still in progress
                },
            ],
        },
        {
            testId: 'TestId2',
            userId: '1',
            username: 'Пузиков Виктор Андреевич',
            status: 'complete',
            stagesStats: [
                {
                    stageId: 'StageId1',
                    status: 'failure',
                    questionsCompleted: '20',
                    dateOpen: '2023-01-01T00:00:00Z',
                    dateComplete: '2023-01-01T01:00:00Z',
                    videoStats: [
                        {
                            status: 'completed',
                            duration: 3600,
                            viewingGuarantee: true,
                            playStartDate: '2023-01-01T00:15:00Z',
                            playCompleteDate: '2023-01-01T00:45:00Z',
                            averageAttention: [
                                {value: 80},
                                {value: 75},
                                {value: 85},
                                {value: 90},
                            ],
                        },
                        // Add more video stats if needed
                    ],
                    stageDeadLine: '2023-01-01T02:00:00Z',
                    questionsStartDate: '2023-01-01T01:15:00Z',
                    questionsCompleteDate: '2023-01-01T01:45:00Z',
                },
                // Add more stages if needed
                {
                    stageId: 'StageId2',
                    status: 'in-progress',
                    questionsCompleted: '15',
                    dateOpen: '2023-01-01T02:00:00Z',
                    dateComplete: '2023-01-01T03:00:00Z',
                    videoStats: [
                        {
                            status: 'in-progress',
                            duration: 1800,
                            viewingGuarantee: true,
                            playStartDate: '2023-01-01T02:15:00Z',
                            // playCompleteDate: undefined, // Uncomment if the video is still in progress
                            pausesDates: [
                                {
                                    start: '2023-01-01T02:30:00Z',
                                    // end: undefined, // Uncomment if the pause is still in progress
                                },
                            ],
                            averageAttention: [
                                {value: 70},
                                {value: 65},
                                {value: 75},
                            ],
                        },
                        // Add more video stats if needed
                    ],
                    stageDeadLine: '2023-01-01T04:00:00Z',
                    questionsStartDate: '2023-01-01T03:15:00Z',
                    // questionsCompleteDate: undefined, // Uncomment if the questions are still in progress
                },
                {
                    stageId: 'StageId1',
                    status: "not-started",
                    questionsCompleted: '20',
                    dateOpen: '2023-01-01T00:00:00Z',
                    dateComplete: '2023-01-01T01:00:00Z',
                    videoStats: [
                        {
                            status: 'not-started',
                            duration: 3600,
                            viewingGuarantee: true,
                            playStartDate: '2023-01-01T00:15:00Z',
                            playCompleteDate: '2023-01-01T00:45:00Z',
                            pausesDates: [
                                {
                                    start: '2023-01-01T00:30:00Z',
                                    end: '2023-01-01T00:35:00Z',
                                },
                            ],
                            averageAttention: [
                                {value: 80},
                                {value: 75},
                                {value: 85},
                                {value: 90},
                            ],
                        },
                        // Add more video stats if needed
                    ],
                    stageDeadLine: '2023-01-01T02:00:00Z',
                    questionsStartDate: '2023-01-01T01:15:00Z',
                    questionsCompleteDate: '2023-01-01T01:45:00Z',
                },
            ],
        },
    ],
}

    export const Employers: FC = () => {
    const navigate = useNavigate();
    const { userId }  = useParams();

    const [userData, setUserData] = useState<TUserStatistics | undefined>();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Заглушка для демонстрации
        if (userId) {
            setUserData(statisticSource);
            setOpen(true);
        }

    }, [userId]);

    const handleStats = useCallback((user: TTabledUser) => {
        navigate(getEmployersPassingLink(user.id));
    }, []);

    const dataUserColumns = useMemo(() => {
        return userColumns({
            onStats: handleStats
        });
    }, []);

    const onClose = () => {
        setOpen(false);
        navigate(getEmployersPassingLink())
    };
    return (
        <TableWrapper>
            <Table
                columns={dataUserColumns}
                dataSource={dataSource}
                pagination={false}
            />
            <EmployersDrawer
                statistic={userData}
                open={open}
                onClose={onClose}/>

        </TableWrapper>
    );
};
