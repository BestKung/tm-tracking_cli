import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {SearchLetterInformComponent} from "./search_letter_inform.component";
import {CalendarGTModule} from "../component/calendar/calendar_custom.component";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {SharedModule} from "../shared/shared.module";
import {routing} from "./letter_inform.routing";

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        CalendarGTModule,
        CalendarModule,
        SharedModule,
        routing,
    ],
    declarations: [
        SearchLetterInformComponent,
    ]
})
export class LetterInformModule {
}
