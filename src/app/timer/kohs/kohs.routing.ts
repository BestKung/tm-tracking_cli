import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListTimerKohsComponent} from "./list_timer_kohs.component";
/**
 * Created by neng on 2/8/17.
 */
export const routing:ModuleWithProviders = RouterModule.forChild([
    {path: 'search', component: ListTimerKohsComponent}
]);