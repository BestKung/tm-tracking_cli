import {Act} from "../model/act";
/**
 * Created by best on 10/10/2559.
 */
export class CategoryForSave {
    id:number;
    name:string
    description:string;
    totalDuration:number;
    durationGreen:number;
    durationYellow:number;
    durationOrange:number;
    percenDurationGreen:number;
    percenDurationYellow:number;
    percenDurationOrange:number;
    durationType:string;
    act:Act = new Act();
}