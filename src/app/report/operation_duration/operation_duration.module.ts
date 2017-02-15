/**
 * Created by neng on 10/12/2559.
 */
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {routing} from "./operation_duration.routing";
import {ChartModule} from "primeng/components/chart/chart";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {CalendarGTModule} from "../../component/calendar/calendar_custom.component";
import {SharedModule} from "../../shared/shared.module";
import {ListOperationDurationComponent} from "./list_operation_duration.component";
import {OperationDurationDetailComponent} from "./operation_duration_detail.component";
import {OperationDurationComponent} from "./operation_duration.component";
import {DetailReportButtomComponent} from "../detail_report_button.component";
@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        ChartModule,
        CalendarModule,
        CalendarGTModule,
        SharedModule,
    ],
    declarations: [
        ListOperationDurationComponent,
        OperationDurationComponent,
        OperationDurationDetailComponent,
        DetailReportButtomComponent
    ]
})

export class OperationDurationModule {

}