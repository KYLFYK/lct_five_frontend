import {Drawer, Steps, Tabs, Timeline} from "antd";
import { TUserStatistics } from "../../types/user";
import styled from "@emotion/styled";
import TestStep from "./TestStep";
import TabPane from "antd/es/tabs/TabPane";

type TEmployersDrawerProps = {
    onClose?: () => void;
    statistic?: TUserStatistics;
    open?: boolean;
};

const Wrapper = styled("div")`
  padding: 20px;
`;

export const EmployersDrawer = ({onClose, statistic, open = false,}: TEmployersDrawerProps) => {
    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <Drawer
            title={statistic?.userName}
            width={"60%"}
            onClose={onClose}
            open={open}
        >
            <Tabs onChange={onChange} type="card">
                {statistic?.statistic.map((test, testIndex) => (
                    <TabPane tab={`Тест ${testIndex + 1}`} key={String(testIndex)}>
                        <TestStep test={test} testIndex={testIndex} />
                    </TabPane>
                ))}
            </Tabs>
        </Drawer>
    );
};
