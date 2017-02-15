"use strict";
var router_1 = require("@angular/router");
var list_report_component_1 = require("./list_report.component");
var list_statistic_inform_component_1 = require("./static-informing/list_statistic_inform.component");
var list_verify_comoponent_1 = require("./statistics-verify-request/list_verify.comoponent");
var list_discard_component_1 = require("./discard/list_discard.component");
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_report_component_1.ListReportComponent },
    { path: 'operation-duration', loadChildren: 'app/report/operation_duration/operation_duration.module#OperationDurationModule' },
    { path: 'services-and-examine', loadChildren: 'app/report/services-and-examine/services_and_examine.module#ServicesAndExamineModule' },
    { path: 'announcement-to-population', loadChildren: 'app/report/announcement-to-population/announcement.module#AnnouncementModule' },
    { path: 'statistics-informing', component: list_statistic_inform_component_1.ListStatisticInformComponent },
    { path: 'statistics-verify-request', component: list_verify_comoponent_1.ListStatisticsVerifyComponent },
    { path: 'discard', component: list_discard_component_1.ListDiscardComponent }
]);
//# sourceMappingURL=reports.route.js.map