import {Contract} from "./contract";
/**
 * Created by neng on 18/10/2559.
 */
export class Letter {

    id: number;
    trackingNo: string;
    informDate: Date;
    informNote: string;
    ackDate: Date;
    ackNote: string;
    recvDate: Date|string ;
    chk: boolean = false;
    bookDate: Date;
    status: string;
    dueDate: Date|string;
    flagRecv: boolean;
    letterStatus: string;

    agreementContract: Contract;
    attachedItem: string;
    bookAdmin: string;
    bookNo: number;
    detail: string;
    receiver: string;
    referenceTo: string;
    renewState: string;
    returnedDate: string;
    title: string;
    trNo: number;
}