/**
 * Created by best on 8/9/2559.
 */

export class VerifyEvidenceModel {

    id: number;
    recvId: number;
    trNo: number;
    officerName: string;
    trDate: Date;
    ownerName: string;
    sisNo: string;
    checked: boolean;
}

export class VerifyEvidenceSearch {

    officerName: string;
    verifyEvidencePk: VerifyEvidencePk;
    formType:string;
}

export class VerifyEvidencePk {

    trNo: number;
    reqDate: Date;
}