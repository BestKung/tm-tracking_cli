import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFollowRenewComponent} from "./list_follow_renew.component";
import {RenewOperationalDetailComponent} from "./detail/renew_operation_details.component";
/**
 * Created by neng on 9/12/2559.
 */
export const routing:ModuleWithProviders = RouterModule.forChild(
    [
        {path: '', component: ListFollowRenewComponent},
        {path: 'detail/:trNo', component: RenewOperationalDetailComponent}
    ]
);