import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";
/**
 * Created by pramoth on 8/31/2016 AD.
 */
export const routing: ModuleWithProviders = RouterModule.forChild([
    {path: 'login', component: LoginComponent}
]);
