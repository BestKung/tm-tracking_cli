import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFollowTransferLegacy} from "./list_follow_transfer_legacy.component";
import {TransferOperationalDetailComponent} from "./transfer-legacy-operation-details/transfer_operation_details.component";
/**
 * Created by neng on 9/12/2559.
 */
export const routing:ModuleWithProviders = RouterModule.forChild(
    [
        {path: '', component: ListFollowTransferLegacy},
        {path: 'detail/:trNo', component: TransferOperationalDetailComponent},
    ]
)