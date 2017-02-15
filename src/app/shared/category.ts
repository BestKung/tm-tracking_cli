import {Act} from "../administrator/model/act";
import {Step} from "../administrator/effectivedate_act_facilitate/step";
/**
 * Created by best on 10/10/2559.
 */
export class Category {
    id:number;
    name:string;
    totalDurationOfCategory:number
    act:Act = new Act();
    actId:string;
    steps:Array<Step> = new Array<Step>();
    description:string;
    totalDuration:number;
    durationGreen:number;
    durationYellow:number;
    durationOrange:number;
    percenDurationGreen:number;
    percenDurationYellow:number;
    percenDurationOrange:number;
    durationType:string;
    effectiveDate:string;
}