import { User } from "./User";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class UserService {

    private _url: string = 'api/account';

    constructor(private _http: Http) {}

    getCurrentUser(): Observable<User> {
        return this._http.get(this._url)
            .map((response: Response) => <User> response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);

    }

    private handleError(error: any, user: Observable<User>): Observable<User> {
        console.log(error);
        return user;
    }

}
