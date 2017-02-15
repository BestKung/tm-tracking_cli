import {Injectable, Input} from "@angular/core";
import {URLSearchParams, Jsonp, Http} from "@angular/http";
import {DateSupportURLSearchParams} from "../date-support-url-search-params";
import {CtltLocation} from "../../model/ctltlocation-model";
declare var jQuery:any;
/**
 * Created by neng on 8/10/2559.
 */
@Injectable()
export class LocationAutocompleteService {

    result: searchResult[] = [];
    location: CtltLocation = new CtltLocation();


    constructor(private http: Http) {

    }

    searchLocation(tumbon: string): any {
        let params = new DateSupportURLSearchParams();
        params.set("tumbon", tumbon);
        return this.http.get('/api/location/', {search: params}).map(resp => resp.json());
    }

    searchFullLocationFromTumbonName(searchLocation: string) {
        let params = new DateSupportURLSearchParams();
        params.set("location", searchLocation || null);
        this.http.get('/api/location/full-location', {search: params}).map(resp => resp.json()).subscribe(resp => {
            this.location = resp;
            console.log(this.location);
        });
    }
}

export class searchResult {

    title: string;
}