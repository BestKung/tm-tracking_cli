import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {routing} from './acknowledgement.routing';
import {AcknowledgementComponent} from "./acknowledgement.component";
import {CalendarGTModule} from "../component/calendar/calendar_custom.component";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {SharedModule} from "../shared/shared.module";
import {ReturnRequestRenewComponent} from "../letter-inform/return-request/return_request_renew.component";
@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        CalendarModule,
        CalendarGTModule,
        SharedModule],
    declarations: [
        AcknowledgementComponent,
        ReturnRequestRenewComponent
    ]
})
export class AcknowledgementModule {
}
