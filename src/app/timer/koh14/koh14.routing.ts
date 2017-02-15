import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListTimerKoh14Component} from "./list_timer_koh14.component";
import {SearchTimerKoh14Component} from "./search_timer_koh14.component";
/**
 * Created by neng on 2/8/17.
 */
export const routing:ModuleWithProviders = RouterModule.forChild([
    {path: 'search', component: ListTimerKoh14Component}
]);