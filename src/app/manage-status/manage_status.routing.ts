import {ListManageStatusComponent} from "./list_manage_status";
import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {Matra56Component} from "./matra56/matra56.component";
import {Matra40Component} from "./matra40/matra40.component";
/**
 * Created by best on 15/12/2559.
 */
export const routing: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'manage-status', component: ListManageStatusComponent,
        children: [
            {path: 'matra56', component: Matra56Component},
            {path: 'matra40', component: Matra40Component}
        ]
    }
]);