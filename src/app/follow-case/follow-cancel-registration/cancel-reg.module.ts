/**
 * Created by neng on 9/12/2559.
 */
import {NgModule} from "@angular/core";
import {CancelOperationDetailsComponent} from "./cancel-operation-details/cancel_operation_details.component";
import {FollowCancelTableContentComponent} from "./follow_cancel_table_content.component";
import {DetailCancelRegisterationButtonComponent} from "./detail_cancel_registeration_button.component";
import {FollowCancelRestService} from "../../shared/service/followcancel-rest-obj.service";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {GTCalendarModule} from "../../component/datepicker/calendar";
import {routing} from "./cancel-reg.routing";
import {NgSemanticModule} from "ng-semantic";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {ListCancelRegistrationComponent} from "./list_cancel_registration.component";
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
    ]   ,
    declarations: [
        ListCancelRegistrationComponent,
        CancelOperationDetailsComponent,
        FollowCancelTableContentComponent,
        DetailCancelRegisterationButtonComponent
    ],
    providers: [
        FollowCancelRestService
    ]
})
export class CancelRegModule {

}