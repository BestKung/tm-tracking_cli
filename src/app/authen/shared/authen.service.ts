import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {User} from "./User";
import {Http, Response} from "@angular/http";
/**
 * Created by pramoth on 8/25/2016 AD.
 */

@Injectable()
export class AuthenService {

    private _isAuthen = new BehaviorSubject<boolean>(false);
    private _isHasAnyRole = new BehaviorSubject<boolean>(false);
    private user = new BehaviorSubject<User>(null);
    private _subscription: Subscription;

    constructor(private _http: Http) {
        let tmpUser: User = <User> JSON.parse(localStorage.getItem('user'));
        this.user.next(tmpUser);
    }

    isAuthen(): BehaviorSubject<boolean> {
        let isAuthen = localStorage.getItem("isAuthen");
        this._isAuthen = new BehaviorSubject<boolean>(!!isAuthen);
        return this._isAuthen;
    }

    authen(username: string, password: string): BehaviorSubject<User> {
        let user: User = new User();
        user.username = username;
        user.password = password;
        this._subscription = this._http.post('api/auth/login', user)
            .do((response: Response) => console.log('response: ', response.headers.getAll("authorization")))
            .map((response: Response) => <User> response.json())
            .subscribe((user: User) => this.updateCurrentUser(user));
        return this.user;
    }

    logout() {
        this._http.get("api/auth/logout").subscribe(e => {
            console.log("logout successful.")
        });
        localStorage.removeItem("isAuthen");
        localStorage.removeItem("user");
        this._isAuthen.next(false);
        this.user.next(null);
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        console.log("logout successful.")
    }

    hasAnyRole(roles: string[]): boolean {
        if (!this.user.getValue()) {
            return false;
        }
        if (roles.indexOf("*") > -1) {
            return true;
        }
        let validRole: boolean = this.user.getValue().authorities.some((authority: string) => roles.some((role: string) => role == authority));
        return validRole;
    }

    getUser(): Observable<User> {
        return this.user;
    }

    updateCurrentUser(user: User): void {
        console.log("::::::::::::::::::USER UPDATED:::::::::::::");
        this.user.next(user);
        if (user) {
            console.log('in if');
            localStorage.setItem("isAuthen", "true");
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
}
