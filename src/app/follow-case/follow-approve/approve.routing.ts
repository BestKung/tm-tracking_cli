import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFollowApproveComponent} from "./list_follow_approve.component";
import {ApproveOperationDetailsComponent} from "./approve-operation-details/approve_operation_details.component";
/**
 * Created by neng on 9/12/2559.
 */
export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {path: '', component: ListFollowApproveComponent},
        {path: 'detail/:trNo', component: ApproveOperationDetailsComponent}
    ]
);