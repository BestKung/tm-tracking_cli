import {SistPaymentDtModel} from "./sist-payment-dt-model";
/**
 * Created by neng on 22/9/2559.
 */
export class AgencyModel {
    id: string;
    agenAddr: string;
    agenCardNo: string;
    agenCardType: number;
    agenEmail: string;
    agenFax: string;
    agenGender: number;
    agenKind: string;
    agenName: string;
    agenPhone: string
    agenPostcode: string;
    agenType: number;
    agenTypeDet: string;
    locCode: string;
    sistRecvTmList: SistPaymentDtModel[]=[]
    useFlag: number;
    ctltLocation: Location = new Location();
}
export class Location {

    id: number;
    locCode: string;
    regId: number;
    locAbbrName: string;
    locName: string;
    locRepName: string;
    aumpCode: string;
    provCode: string;
    postcode: string;
    provName: string;
    aumpName: string;
    tumbonName: string;
}