/**
 * Created by neng on 9/12/2559.
 */
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {routing} from "./approve.routing";
import {GTCalendarModule} from "../../component/datepicker/calendar";
import {SharedModule} from "../../shared/shared.module";
import {ApproveOperationDetailsComponent} from "./approve-operation-details/approve_operation_details.component";
import {FollowApproveSearchComponent} from "./follow_approve_search.component";
import {DetailApproveButtonComponent} from "./detail_approve_button.component";
import {FollowApproveRestObjectService} from "../../shared/service/followapprove-rest-obj.service";
import {ListFollowApproveComponent} from "./list_follow_approve.component";
@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        GTCalendarModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ListFollowApproveComponent,
        ApproveOperationDetailsComponent,
        FollowApproveSearchComponent,
        DetailApproveButtonComponent,
    ],
    providers: [
        FollowApproveRestObjectService
    ]
})

export class ApproveModule {

}