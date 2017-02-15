import {AbsenceAgreementModel, Contract} from "./absence-agreement-model";
export class ReturnedRequest {

    id: number;
    bookAdmin: string;
    returnedDate: Date;
    title: string;
    receiver: string;
    referenceTo: string;
    attachedItem: string;
    detail: string;
    agreement: AbsenceAgreementModel;
    agreementContract: Contract;
    trNo: number;
    canceledFlag: boolean;
    canceledReason: string;
    chk: boolean;
    agreementId: number;
    invokedDate: Date;
    recvDate: Date;
    bookDate: Date|string;
}

export class ReturnedRequestWithLetter extends ReturnedRequest {

    trackingNo: string;
    informNote: string;
    receivedMethod: boolean = false;
}
