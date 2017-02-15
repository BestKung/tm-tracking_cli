/**
 * Created by neng on 10/12/2559.
 */
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {routing} from "./services_and_examine.rounting";
import {ChartModule} from "primeng/components/chart/chart";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {CalendarGTModule} from "../../component/calendar/calendar_custom.component";
import {SharedModule} from "../../shared/shared.module";
import {ListServiceAndExamineComponent} from "./list_service.component";
import {SearchServicesAndExamineStatistics} from "./search_services_and_examine_statistics_component";
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
        ListServiceAndExamineComponent,
        SearchServicesAndExamineStatistics
    ]
})
export class ServicesAndExamineModule {

}