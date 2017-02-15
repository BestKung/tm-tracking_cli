import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { NgSemanticModule } from "ng-semantic";
import { routing } from "./authen.routing";
import { AuthenService } from "./shared/authen.service";
import { AuthGuard } from "./auth-guard.service";
import { LoginComponent } from "./login.component";
import { HasAnyRoleDirective } from "./hasanyrole.directive";
import { UserService } from "./shared/user.service";
import { IsNotAuthenDirective } from "./is_not_authen.directive";
/**
 * Created by pramoth on 8/31/2016 AD.
 */
@NgModule({
    imports: [FormsModule, HttpModule, CommonModule, NgSemanticModule, routing],
    declarations: [LoginComponent, HasAnyRoleDirective, IsNotAuthenDirective],
    exports: [HasAnyRoleDirective, IsNotAuthenDirective],
    providers: [AuthenService, AuthGuard, UserService]
})
export class AuthenModule {

}
