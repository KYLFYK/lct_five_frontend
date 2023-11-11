import styled from '@emotion/styled';

import Table from 'antd/lib/table';
import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {TableProps as RcTableProps} from "rc-table/lib/Table";
import {useNavigate, useParams} from "react-router-dom";
import {TTabledTest} from "../../types/tests";
import { getStatPassingLink } from "../../utils/route-utils";
import {testColumns} from "../home-page/test-table";
import dayjs from "dayjs";
import {TTestStatistic} from "../../types/stats";
import {StatsDrawer} from "./StatsDrawer";

const TableWrapper = styled('div')`
  width: 100%;
`;
const dataSource: RcTableProps<TTabledTest>['data'] = [
    {
        id: '1',
        key: '1',
        title: 'Безопасность на рабочем месте',
        createDate: dayjs()
            .add(-42, 'days')
            .add(3, 'hours')
            .add(48, 'minutes')
            .toISOString(),
        updateDate: dayjs()
            .add(-5, 'days')
            .add(1, 'hours')
            .add(32, 'minutes')
            .toISOString(),
        description: 'Тестирование: "Безопасность на рабочем месте"',
    },
    {
        id: '2',
        key: '2',
        title: 'Корпоративная этика',
        createDate: dayjs()
            .add(-83, 'days')
            .add(6, 'hours')
            .add(11, 'minutes')
            .toISOString(),
        updateDate: dayjs()
            .add(-12, 'days')
            .add(2, 'hours')
            .add(23, 'minutes')
            .toISOString(),
        description: 'Тестирование: "Корпоративная этика"',
    },
    {
        id: '3',
        key: '3',
        title: 'Онбординг',
        createDate: dayjs()
            .add(-342, 'days')
            .add(4, 'hours')
            .add(24, 'minutes')
            .toISOString(),
        updateDate: dayjs()
            .add(-46, 'days')
            .add(7, 'hours')
            .add(27, 'minutes')
            .toISOString(),
        description: 'Проект: "Личный кабинет сотрудника"',
    },
    {
        id: '4',
        key: '4',
        title: 'Пожарная безопасность',
        createDate: dayjs()
            .add(-478, 'days')
            .add(9, 'hours')
            .add(7, 'minutes')
            .toISOString(),
        updateDate: dayjs()
            .add(-48, 'days')
            .add(2, 'hours')
            .add(56, 'minutes')
            .toISOString(),
        description: '',
    },
];

const userStatusMocks: TTestStatistic =     {
    testId: "1",
    testTitle: "Test 1",
    users: [
        {
            id: 'user1',
            telegram: 'user1_telegram',
            name: 'User 1',
            surname: 'User 1 Surname',
            description: 'User 1 Description',
            employmentDate: '2023-01-01',
            status: 'complete',
        },
        {
            id: 'user2',
            telegram: 'user2_telegram',
            name: 'User 2',
            surname: 'User 2 Surname',
            description: 'User 2 Description',
            employmentDate: '2023-01-02',
            status: 'in-progress',
        },
        {
            id: 'user3',
            telegram: 'user3_telegram',
            name: 'User 3',
            surname: 'User 3 Surname',
            description: 'User 3 Description',
            employmentDate: '2023-01-03',
            status: 'not-started',
        },
        // Добавьте нужное количество пользователей с разными статусами
    ],
};


export const Stats: FC = () => {
    const navigate = useNavigate();
    const { recordId }  = useParams();

    const [testData, setTestData] = useState<TTestStatistic>();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Заглушка для демонстрации
        if (recordId) {
            setTestData(userStatusMocks);
            setOpen(true);
        }

    }, [recordId]);

    const handleStat = useCallback((record: TTabledTest) => {
        navigate(getStatPassingLink(record.id));
    }, []);

    const dataStatColumns = useMemo(() => {
        return testColumns({
            onStat: handleStat,
        });
    }, []);

    const onClose = () => {
        setOpen(false);
        navigate(getStatPassingLink())
    };

    return (
        <TableWrapper>
            <Table
                columns={dataStatColumns}
                dataSource={dataSource}
                pagination={false}
            />
            <StatsDrawer
                open={open}
                onClose={onClose}
                statistic={testData}
            />
        </TableWrapper>
    );
};
