import {Category} from "../../shared/category";
/**
 * Created by best on 16/9/2559.
 */
export class Step {
    id:number;
    name:string;
    totalDuration:number;
    durationGreen:number;
    durationYellow:number;
    durationOrange:number;
    durationType:string;
    percenDurationGreen:number;
    percenDurationYellow:number;
    percenDurationOrange:number;
    statusCode:string;
    category:Category = new Category();
    idCategory:number;
}
