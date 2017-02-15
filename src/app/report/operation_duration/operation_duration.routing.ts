import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListOperationDurationComponent} from "./list_operation_duration.component";
import {OperationDurationDetailComponent} from "./operation_duration_detail.component";
/**
 * Created by neng on 10/12/2559.
 */
export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {path: 'search', component: ListOperationDurationComponent},
        {path: 'detail/:trNo/:formType', component: OperationDurationDetailComponent},
    ]
);