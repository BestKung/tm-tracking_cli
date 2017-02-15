/**
 * Created by neng on 9/12/2559.
 */
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {routing} from "./renew.routing";
import {GTCalendarModule} from "../../component/datepicker/calendar";
import {SharedModule} from "../../shared/shared.module";
import {RenewOperationalDetailComponent} from "./detail/renew_operation_details.component";
import {FollowRenewSearchComponent} from "./follow_renew_search.component";
import {DetailRenewButtonComponent} from "./detail_renew_button.component";
import {ListFollowRenewComponent} from "./list_follow_renew.component";
import {FollowRenewRestObjectService} from "../../shared/service/followrenew-rest-obj.service";
@NgModule ({
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
        ListFollowRenewComponent,
        RenewOperationalDetailComponent,
        FollowRenewSearchComponent,
        DetailRenewButtonComponent
    ],
    providers: [
        FollowRenewRestObjectService
    ]
})
export class RenewModule {

}