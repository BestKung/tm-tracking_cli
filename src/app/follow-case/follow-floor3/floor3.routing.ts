import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFollowFloor3Component} from "./list_follow_floor3.component";
import {ReturnRequestComponent} from "./return-request/return_request.component";
/**
 * Created by neng on 9/12/2559.
 */
export const routing:ModuleWithProviders = RouterModule.forChild(
    [
        {path: 'follow/floor3', component: ListFollowFloor3Component},
        {path: 'follow/floor3/return-request/:id', component: ReturnRequestComponent},
    ]
);
