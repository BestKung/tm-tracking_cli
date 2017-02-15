import {Injectable} from "@angular/core";
/**
 * Created by best on 14/11/2559.
 */
@Injectable()
export class FindHistoryService {
    trNo: string;
    stepCode: string;
    startDateStr: string|Date;
    endDateStr: string|Date;
}