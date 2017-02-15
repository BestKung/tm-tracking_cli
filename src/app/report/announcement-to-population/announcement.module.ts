/**
 * Created by neng on 10/12/2559.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CalendarGTModule} from "../../component/calendar/calendar_custom.component";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {ChartModule} from "primeng/components/chart/chart";
import {routing} from "./announcement.routing";
import {NgSemanticModule} from "ng-semantic";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {SearchAnnouncementToPopulationStatistics} from "./search_announcement_to_population_statistics_component";
import {ListAnnouncementComponent} from "./list_annoucement.component";
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
        ListAnnouncementComponent,
        SearchAnnouncementToPopulationStatistics,
    ]
})

export class AnnouncementModule {

}