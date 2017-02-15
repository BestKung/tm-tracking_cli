import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {CalendarGTModule} from "../../component/calendar/calendar_custom.component";
import {SharedModule} from "../../shared/shared.module";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {ListTimerKohsComponent} from "./list_timer_kohs.component";
import {SearchTimerKohsComponent} from "./search_timer_kohs.component";
import {routing} from "./kohs.routing";
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
        AutoCompleteModule,

    ],
    declarations: [
        ListTimerKohsComponent,
        SearchTimerKohsComponent
    ]
})
export class TimerKohsModule {

}