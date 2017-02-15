/**
 * Created by neng on 21/10/2559.
 */
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {CalendarGTModule} from "../component/calendar/calendar_custom.component";
import {ListDocumentComponent} from "./list_document.component";
import {PrintReturnRequestComponent} from "./print_return_request.component";
import {routing} from "./document.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        CalendarModule,
        CalendarGTModule,
        SharedModule
    ],
    declarations: [
        ListDocumentComponent,
        PrintReturnRequestComponent
    ]
})
export class DocumentModule {}
