/**
 * Created by pramoth on 9/1/2016 AD.
 */
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {routing} from "./print_inform.routing";
import {NgModule} from "@angular/core";
import {ListInformComponent} from "./list_inform.component";
import {SearchInformComponent} from "./search_inform.component";
import {CalendarGTModule} from "../component/calendar/calendar_custom.component";
import {PrintBookInformComponent} from "./print_book_inform/print_book_inform.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        CalendarGTModule,
        SharedModule
    ],
    declarations: [
        ListInformComponent,
        SearchInformComponent,
        PrintBookInformComponent
    ]
})
export class PrintInformModule {
}
