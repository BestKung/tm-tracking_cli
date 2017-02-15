/**
 * Created by best on 12/12/2559.
 */
export class StopDuration {
    followTrademark: followTrademark = new followTrademark();
    restDurationForAct: string;
    restDurationForStep: string;
    restDorationPercenForAct: number;
    restDurationPercenForStep: number;
    stopDuration: string;
    overDuration:string;
}

export class followTrademark {
    statusId: number;
    trNo: number;
    requestDate: Date;
    receiptDate: Date;
    personName: string;
    successDate: Date;
    stepCode: string;
    processStatus: string;
    userId: string;
    restDurationForAct: string;
    overDuration: string;
    startCountDuration: Date;
    stepDurationType: string;
    totalDuration: number;
    restDurationForStep: string;
    conName: string;
    actId: string;
    durationOrder: number;
    restDorationPercenForStep: number;
    restDorationPercenForAct: number;
    stepPercenDurationGreen: number;
    stepPercenDurationYellow: number;
    stepPercenDurationOrange: number;
    catPercenDurationGreen: number;
    catPercenDurationYellow: number;
    catPercenDurationOrange: number;
    stepDurationGreen: number;
    stepDurationYellow: number;
    stepDurationOrange: number;
    catDurationGreen: number;
    catDurationYellow: number;
    catDurationOrange: number;
    catDurationType: string;
    useDuration: string
    stopDuration: string;
}