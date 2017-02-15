import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFollowTradeMarkComponent} from "./list_follow_trademark.component";
import {DetailOfOperation} from "./detail/detail_of_operation.component";
/**
 * Created by neng on 9/12/2559.
 */
export const routing:ModuleWithProviders = RouterModule.forChild([

    {path: '', component: ListFollowTradeMarkComponent},
    {path: 'detail/:trNo', component: DetailOfOperation},
]);