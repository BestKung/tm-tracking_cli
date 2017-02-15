import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {CalendarGTModule} from "../component/calendar/calendar_custom.component";
import {SharedModule} from "../shared/shared.module";
import {routing} from "./timer.routing";
import {ListTimerComponent} from "./list_timer.component";
import {TimerKoh14Module} from "./koh14/koh14.module";
/**
 * Created by neng on 2/8/17.
 */
@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        CalendarGTModule,
        SharedModule,
        TimerKoh14Module,
    ],
    declarations: [
        ListTimerComponent,
    ]
})
export class TimerModule {

}