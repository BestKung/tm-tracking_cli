import {Http} from "@angular/http";
import {DateSupportURLSearchParams} from "../date-support-url-search-params";
import {Injectable} from "@angular/core";
import {PageEvent} from "../paging/page_event";
/**
 * Created by neng on 6/11/2559.
 */
@Injectable()
export class ContractAutoCompleteService {

    constructor(private _http: Http) {

    }

    searchContractName(contractName: string, pageEvent: PageEvent = {currentPage: 1, pageSize: 5}): any {
        let params = new DateSupportURLSearchParams();
        params.set("contractName", contractName || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this._http.get('api/contract', {search: params}).map(resp => resp.json());
    }
}