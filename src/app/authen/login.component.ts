/**
 * Created by pramoth on 8/11/2016 AD.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenService} from "./shared/authen.service";
import {User} from "./shared/User";
import {BehaviorSubject} from "rxjs";
import {Http, Response} from "@angular/http";

@Component({
    moduleId: module.id,
    selector: 'gt-login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    private username: string;
    private password: string;
    failMessage: string = '';

    constructor(private router: Router, private authenService: AuthenService, private http: Http) {
    }

    doLogin(event) {
        this.failMessage = '';
        event.preventDefault();
        this.login(this.username, this.password);
    }


    login(username: string, password: string) {
        let userReturn: User = new User();
        let user: User = new User();
        user.username = username;
        user.password = password;
        this.http.post('api/auth/login', user)
            .do((response: Response) => console.log('response: ', response.headers.getAll("authorization")))
            .map((response: Response) => <User> response.json())
            .subscribe((user: User) => {
                this.authenService.updateCurrentUser(user);
                this.router.navigate(['/home']);
            }, err => {
                this.failMessage = 'Failed to sign in! Please check your credentials and try again.';
            });
    }


}
