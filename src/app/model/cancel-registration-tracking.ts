import {SistRecvTmModel} from "./sist-recv-tm-model";
import {Duration} from "./duration-model";
import {Step} from "../administrator/effectivedate_act_facilitate/step";
/**
 * Created by neng on 3/10/2559.
 */
export class CancelRegistrationTracking {

    id: number;
    sistRecvTm: SistRecvTmModel;
    recvJobId: number;
    recvPersonName: string;
    recvPersonId: string;
    sendPersonName: string;
    actionDesc: string;
    aprvDate: Date;
    formTypeId: string;
    jobId: number;
    reqDate: Date;
    statusDesc: string;
    recvJobDate: Date;
    trNo: number;
    proc: string;
    duration: Duration;
    step: Step;
}

