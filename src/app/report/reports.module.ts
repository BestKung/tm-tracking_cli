import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {routing} from "./reports.route";
import {ListReportComponent} from "./list_report.component";
import {StatisticsInformingComponent} from "./static-informing/statistics_informing.component";
import {ChartModule, CalendarModule} from "primeng/primeng";
import {StatisticsInformingBarchart} from "./bar-chart/report_statistics_informing_barchart.component";
import {StatisticsInformingLinechart} from "./line-chart/report_statistics_informing_linechart.component";
import {CalendarGTModule} from "../component/calendar/calendar_custom.component";
import {StatisticsVerifyRequestComponent} from "./statistics-verify-request/statistics_verify_request.component";
import {ReportStatisticsVerifyRequestComponent} from "./bar-chart/report_statistics_verify_request.component";
import {ReportStatisticsVerifyRequestLinechart} from "./line-chart/report_statistics_verify_request_linechart.component";
import {SharedModule} from "../shared/shared.module";
import {NotificationRestObjectService} from "../shared/service/notification-rest-obj.service";
import {ListStatisticInformComponent} from "./static-informing/list_statistic_inform.component";
import {ListStatisticsVerifyComponent} from "./statistics-verify-request/list_verify.comoponent";
import {ListDiscardComponent} from "./discard/list_discard.component";
import {SearchDiscard} from "./discard/search_discard";

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
        ListReportComponent,
        ListStatisticInformComponent,
        ListStatisticsVerifyComponent,
        StatisticsInformingComponent,
        StatisticsInformingBarchart,
        StatisticsInformingLinechart,
        StatisticsVerifyRequestComponent,
        ReportStatisticsVerifyRequestComponent,
        ReportStatisticsVerifyRequestLinechart,
        ListDiscardComponent,
        SearchDiscard
    ],
    providers: [
        NotificationRestObjectService
    ]
})
export class ReportsModule {
}
