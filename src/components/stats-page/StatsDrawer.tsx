import {Drawer} from "antd";
import {TTabledUser} from "../../types/user";
import styled from "@emotion/styled";
import {TTestStatistic} from "../../types/stats";
import Table from "antd/lib/table";
import {useMemo} from "react";
import {userColumns} from "../home-page/user-table";
import {TableProps as RcTableProps} from "rc-table/lib/Table";
import {statusToPresentation} from "../../utils/testing-utils";

type TStatsDrawerProps = {
    onClose?: () => void;
    statistic?: TTestStatistic;
    open?: boolean;
};

const TableWrapper = styled('div')`
  width: 100%;
`;

export const StatsDrawer = ({onClose, statistic, open = false,}: TStatsDrawerProps) => {

    const dataStatColumns = useMemo(() => {
        return userColumns({
            status: true
        });
    }, []);

    const tableData: RcTableProps<TTabledUser>['data'] = statistic?.users as TTabledUser[];

    const columnsWithRussianStatus = dataStatColumns.map(column => {
        if (column.key === 'status') {
            return {
                ...column,
                render: (text: string) => {
                    return statusToPresentation(text);
                },
            };
        }
        return column;
    });

    return (
        <Drawer
            title={statistic?.testTitle}
            width={"60%"}
            onClose={onClose}
            open={open}
        >
            <TableWrapper>
                <Table
                    columns={columnsWithRussianStatus}
                    dataSource={tableData}
                    pagination={false}
                />
            </TableWrapper>
        </Drawer>
    );
};
