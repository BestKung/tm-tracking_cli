import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListCancelRegistrationComponent} from "./list_cancel_registration.component";
import {CancelOperationDetailsComponent} from "./cancel-operation-details/cancel_operation_details.component";
/**
 * Created by neng on 9/12/2559.
 */
export const routing: ModuleWithProviders =  RouterModule.forChild(
    [
        {path: '',component: ListCancelRegistrationComponent},
        {path: 'detail/:trNo',component: CancelOperationDetailsComponent}
    ]
);