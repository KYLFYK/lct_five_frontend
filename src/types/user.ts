import {TTestByUserStatistic} from "./stats";

export type TTabledUser = {
    key: string;
    status?: string;
} & TUser;

export type TUser = {
    id: string;
    telegram: string;
    name: string;
    surname: string;
    description: string;
    employmentDate: string;
}

export type TUserStatistics = {
    userId: string;
    userName: string;
    statistic: TTestByUserStatistic[];
}