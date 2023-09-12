export const Date = {
    MON: 'mon',
    TUE: 'tue',
    WED: 'wed',
    THU: 'thu',
    FRI: 'fri',
    SAT: 'sat',
    SUN: 'sun'
} as const

export type User = {
    _id: string;
    fullName: string;
    performance: number;
    personalWeekends: string[];
    definedWeekends: string[];
}

export type ResponseType<D = {}> = {
    resultCode: number;
    messages: Array<string>;
    data: D;
};
