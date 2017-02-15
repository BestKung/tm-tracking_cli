import {CanActivate, Router} from "@angular/router";
import {AuthenService} from "./shared/authen.service";
import {Injectable} from "@angular/core";
/**
 * Created by pramoth on 8/28/2016 AD.
 */

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authenService:AuthenService, private router: Router){

    }
    canActivate(){
        if(!this.authenService.isAuthen().getValue()){
            console.log("un-authenticated access.. redirect to /login")
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}