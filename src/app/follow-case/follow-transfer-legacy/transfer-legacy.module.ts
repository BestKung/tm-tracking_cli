/**
 * Created by neng on 9/12/2559.
 */
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgSemanticModule} from "ng-semantic";
import {CommonModule} from "@angular/common";
import {GTCalendarModule} from "../../component/datepicker/calendar";
import {SharedModule} from "../../shared/shared.module";
import {routing} from "./transfer-legacy.routing";
import {ListFollowTransferLegacy} from "./list_follow_transfer_legacy.component";
import {FollowTransferRestObjectService} from "../../shared/service/followtransfer-rest-obj.service";
import {TransferOperationalDetailComponent} from "./transfer-legacy-operation-details/transfer_operation_details.component";
import {FollowTranferSearchComponent} from "./follow_tranfer_search.component";
import {DetailTranferButtonComponent} from "./detail_tranfer_button.component";
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
        ListFollowTransferLegacy,
        TransferOperationalDetailComponent,
        FollowTranferSearchComponent,
        DetailTranferButtonComponent
    ],
    providers: [
        FollowTransferRestObjectService
    ]
})

export class TransferLegacyModule {

}