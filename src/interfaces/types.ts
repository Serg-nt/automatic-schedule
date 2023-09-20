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
    comment: string;
    personalWeekends: string[];
    definedWeekends: string[];
}

