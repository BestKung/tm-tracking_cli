/**
 * Created by neng on 2/8/17.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {NgSemanticModule} from "ng-semantic";
import {CalendarGTModule} from "../../component/calendar/calendar_custom.component";
import {SharedModule} from "../../shared/shared.module";
import {ListTimerKoh14Component} from "./list_timer_koh14.component";
import {FormsModule} from "@angular/forms";
import {SearchTimerKoh14Component} from "./search_timer_koh14.component";
import {routing} from "./koh14.routing";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        CalendarGTModule,
        SharedModule,
        DropdownModule,
        AutoCompleteModule,

    ],
    declarations: [
        ListTimerKoh14Component,
        SearchTimerKoh14Component
    ]
})
export class TimerKoh14Module {

}