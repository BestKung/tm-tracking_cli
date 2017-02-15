import { ReturnedRequest } from "../model/return-request";

export interface AbsenceAgreement {

    id: number;
    requestNumber: number;
    requestDate: Date;
    officerName: string;
    agreementDueDate: Date;
    rejected: boolean;
    fullDuration: number;
    returnRequest: ReturnedRequest;
    labelColor: string;
    kor20Date: Date;
    remainingDays: number;
    allAbsenceEvidence: number[];
    createDate: Date;
    organize: string;
    trNo: number;
    contractName: string;
    referenceTo: string;
    informDate:string|Date;
}
