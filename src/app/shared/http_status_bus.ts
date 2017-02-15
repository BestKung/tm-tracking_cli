import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
/**
 * Created by pramoth on 10/25/2016 AD.
 */
@Injectable()
export class HttpStatusBus {
    start: Subject<any> = new Subject<any>();
    completed: Subject<any> = new Subject<any>();
    error: Subject<any> = new Subject<any>();
}