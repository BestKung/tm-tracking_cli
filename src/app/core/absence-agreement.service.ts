import {Http, Response, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AbsenceAgreement} from "../follow-case/absence_agreement";
import {Page} from "../shared/page";
import {ReturnedRequest} from "../model/return-request";
import {DateSupportURLSearchParams} from "../shared/date-support-url-search-params";
import {InterceptHttp} from "../shared/intercept_http";
declare var jQuery: any;
declare var window: any;
@Injectable()
export class AbsenceAgreementService {

    private requestUrl = 'api/absence-agreement';
    private absenceAgreementUrl = 'api/absence-agreement/id';
    private saveRequestUrl = 'api/absence-agreement/save';
    private saveByThirdFloorUrl = 'api/absence-agreement/3nd-save';
    private saveReturnedRequestUrl = 'api/return-request/save';

    constructor(private _http: InterceptHttp) {
    }

    search(params: DateSupportURLSearchParams): Observable<Page<AbsenceAgreement>> {
        return this._http.get(this.requestUrl, {search: params})
            .map((response: Response) => <Page<AbsenceAgreement>> response.json())
            .do(data => {
                console.log(data);
            });
    }

    searchReturnRequest(params: URLSearchParams): Observable<AbsenceAgreement> {
        return this._http.get(this.absenceAgreementUrl, {search: params})
            .map((response: Response) => <AbsenceAgreement> response.json());
    }

    saveReturnedRequest(returnedRequest: ReturnedRequest): Observable<ReturnedRequest> {
        return this._http.post(this.saveReturnedRequestUrl, returnedRequest)
            .map((response: Response) => <ReturnedRequest> response.json());
    }

    saveAbsenceAgreement(requests: AbsenceAgreement[]): Observable<Page<AbsenceAgreement>> {
        return this._http.post(this.saveRequestUrl, requests)
            .map((response: Response) => <Page<AbsenceAgreement>> response.json());
    }

    saveAbsenceAgreementByThirdFloor(absenceAgreement: AbsenceAgreement): Observable<AbsenceAgreement> {
        return this._http.post(this.saveByThirdFloorUrl, absenceAgreement)
            .map((response: Response) => <AbsenceAgreement> response.json());
    }

    private handleError(error: Response): any {
        console.log(error);
    }
}
