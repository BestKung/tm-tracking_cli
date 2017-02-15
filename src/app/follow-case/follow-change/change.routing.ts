import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFollowChangeComponent} from "./list_follow_change.component";
import {ChangeOperationalDetailComponent} from "./detail/change_operational_detail.component";
/**
 * Created by neng on 9/12/2559.
 */
export const routing:ModuleWithProviders = RouterModule.forChild(
    [
        {path: '', component: ListFollowChangeComponent},
        {path: 'detail/:trNo', component: ChangeOperationalDetailComponent},
    ]
)