import {FormTypeModel} from "./form-type-model";
/**
 * Created by neng on 30/9/2559.
 */
export class EvidenceModel {

    id: number;
    evidenceId: number;
    seqNo: number;
    description: string;
    evidenceType: string;
    child: EvidenceModel[]=[];
    formType: FormTypeModel;
    isCategory: boolean;
    visible: boolean;
    delPermit: boolean;
    hasNo: boolean = false;
    note: string;
    delState: boolean = false;
}