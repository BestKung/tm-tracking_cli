/**
 * Created by neng on 23/9/2559.
 */
import { AgencyModel } from "./agency-model";
import { OfficerViewModel } from "./officer-view-model";
import { EvidenceModel } from "./evidence-model";
import {VerifyEvidencePk} from "./verify-evidence-model";
export class AbsenceAgreementModel {
    id: number;
    agency: AgencyModel = new AgencyModel();
    // officer: OfficerViewModel=new OfficerViewModel();
    absenceEvidenceList: EvidenceModel[] = [];
    createDate: Date;
    updateDate: Date;
    createBy = null;
    updateBy = null;
    agreementDueDate: Date|string;
    trNo: number;
    requestDate: Date;
    agreementContract: Contract=new Contract();
    verifyEvidencePks: VerifyEvidencePk[]=[];
    formSeq: string = '';
    returnedDueDate: Date;
    returnedEvidenceDate: Date;
    ids: number[]=[];
    officerName: string;
    officerPosition: string = '';
}

export class Contract {
    id: number;
    contractName: string;
    cardNo: string;
    address: string;
    tumbon: string;
    aumbhur: string;
    province: string;
    postCode: string;
    email: string;
    trNoSeq: string;
}
