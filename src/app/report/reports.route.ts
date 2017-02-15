import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListReportComponent} from "./list_report.component";
import {ListStatisticInformComponent} from "./static-informing/list_statistic_inform.component";
import {ListStatisticsVerifyComponent} from "./statistics-verify-request/list_verify.comoponent";
import {ListDiscardComponent} from "./discard/list_discard.component";
export const routing:ModuleWithProviders = RouterModule.forChild([
    {path: '', component: ListReportComponent},
    {path: 'operation-duration', loadChildren: 'app/report/operation_duration/operation_duration.module#OperationDurationModule'},
    {path: 'services-and-examine', loadChildren: 'app/report/services-and-examine/services_and_examine.module#ServicesAndExamineModule'},
    {path: 'announcement-to-population', loadChildren: 'app/report/announcement-to-population/announcement.module#AnnouncementModule'},
    {path: 'statistics-informing', component: ListStatisticInformComponent},
    {path: 'statistics-verify-request', component: ListStatisticsVerifyComponent},
    {path: 'discard', component: ListDiscardComponent}
]);
