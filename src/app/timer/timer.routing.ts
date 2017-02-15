import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListTimerComponent} from "./list_timer.component";
/**
 * Created by neng on 2/8/17.
 */
export const routing:ModuleWithProviders = RouterModule.forChild([
    {path: '', component: ListTimerComponent},
    {path: 'koh14', loadChildren: 'app/timer/koh14/koh14.module#TimerKoh14Module'},
    {path: 'kohs', loadChildren: 'app/timer/kohs/kohs.module#TimerKohsModule'}
]);
