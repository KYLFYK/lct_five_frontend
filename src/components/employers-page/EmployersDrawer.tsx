import {Drawer, Steps} from "antd";
import Typography from "antd/lib/typography";
import {TUserStatistics} from "../../types/user";
import dayjs from "dayjs";
import {BASE_DATE_FORMAT_STRING} from "../../constants/patterns";
import styled from "@emotion/styled";
import {statusToPresentation} from "../../utils/testing-utils";


type TEmployersDrawerProps = {
    onClose? : () => void,
    statistic?: TUserStatistics,
    open?: boolean
}
const Wrapper = styled('div')`
    padding: 20px;
  
`;
export const EmployersDrawer = ({onClose, statistic, open = false }: TEmployersDrawerProps) => {



    return (
            <Drawer
                title={statistic?.userName}
                width={"60%"}
                onClose={onClose}
                open={open}
            >
                {statistic?.statistic.map((test) => (
                    // tslint:disable-next-line:jsx-key
                    <Wrapper>
                        <Typography.Title>{test.testId}</Typography.Title>
                    <Steps
                        current={test.stagesStats.findIndex((stage) => stage.status === "in-progress")}
                        items={test.stagesStats.map((stage) => ({
                            title: statusToPresentation(stage.status),
                            description: stage.status === "complete"
                                ? `Дата завершения: ${dayjs(stage.dateComplete).format(BASE_DATE_FORMAT_STRING)}`
                                : stage.status === "in-progress"
                                    ? `Дата начала: ${dayjs(stage.dateOpen).format(BASE_DATE_FORMAT_STRING)}`
                                    : "",
                            status: stage.status === "time-end" || stage.status === "failure"
                                ? "error"
                                : stage.status === "in-progress"
                                ? "process"
                                : stage.status === "not-started"
                                ? "wait"
                                : "finish"
                        }))}
                    />
                    </Wrapper>
                ))}
            </Drawer>
    );
};
