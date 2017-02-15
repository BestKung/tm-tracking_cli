import {Act} from "../model/act";
/**
 * Created by best on 13/9/2559.
 */
export class DeadlineSendDocumentSetting {
    id:number;
    act:Act = new Act();
    actDate:Date;
    actDetail:string;
    totalDuration:number;
    durationGreen:number;
    durationYellow:number;
    durationOrange:number;
}
