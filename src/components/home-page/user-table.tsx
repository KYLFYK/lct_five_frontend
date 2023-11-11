import { Tooltip } from 'antd';
import Space from 'antd/lib/space';
import { ColumnsType } from 'antd/lib/table';
import { TTabledUser } from '../../types/user';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import dayjs from "dayjs";
import { BASE_DATE_FORMAT_STRING } from "../../constants/patterns";

type TTableRecordCallback<T> = (record: T) => unknown;

export const userColumns: <T extends TTabledUser>(props: {
    onStats?: TTableRecordCallback<T>;
    status?: boolean;
}) => ColumnsType<T> = ({ onStats, status }) => [
    {
        title: 'Фамилия',
        dataIndex: 'surname',
        key: 'surname',
        sorter: function (rowA, rowB) {
            return rowA.name.localeCompare(rowB.name);
        },
    },
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        sorter: function (rowA, rowB) {
            return rowA.name.localeCompare(rowB.name);
        },
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Телеграм',
        dataIndex: 'telegram',
        key: 'telegram',
        sorter: function (rowA, rowB) {
            return rowA.telegram.localeCompare(rowB.telegram);
        },
    },
    {
        title: 'Дата взятия на работу',
        dataIndex: 'createDate',
        key: 'createDate',
        sorter: function (rowA, rowB) {
            return dayjs(rowA.employmentDate).unix() - dayjs(rowB.employmentDate).unix();
        },
        render: (value) => dayjs(value).format(BASE_DATE_FORMAT_STRING),
    },
    ...(status
        ? [
            {
                title: 'Статус',
                dataIndex: 'status',
                key: 'status',
            }
        ]
        : []),
    {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record) => (
            <Space size={8}>
                {onStats && (
                    <Tooltip title="Узнать подробнее">
                        <UserOutlined
                            onClick={() => {
                                onStats(record);
                            }}
                        />
                    </Tooltip>
                )}
            </Space>
        ),
    },
];
