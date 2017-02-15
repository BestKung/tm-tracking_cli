"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var reports_route_1 = require("./reports.route");
var list_report_component_1 = require("./list_report.component");
var statistics_informing_component_1 = require("./static-informing/statistics_informing.component");
var primeng_1 = require("primeng/primeng");
var report_statistics_informing_barchart_component_1 = require("./bar-chart/report_statistics_informing_barchart.component");
var report_statistics_informing_linechart_component_1 = require("./line-chart/report_statistics_informing_linechart.component");
var calendar_custom_component_1 = require("../component/calendar/calendar_custom.component");
var statistics_verify_request_component_1 = require("./statistics-verify-request/statistics_verify_request.component");
var report_statistics_verify_request_component_1 = require("./bar-chart/report_statistics_verify_request.component");
var report_statistics_verify_request_linechart_component_1 = require("./line-chart/report_statistics_verify_request_linechart.component");
var shared_module_1 = require("../shared/shared.module");
var notification_rest_obj_service_1 = require("../shared/service/notification-rest-obj.service");
var list_statistic_inform_component_1 = require("./static-informing/list_statistic_inform.component");
var list_verify_comoponent_1 = require("./statistics-verify-request/list_verify.comoponent");
var list_discard_component_1 = require("./discard/list_discard.component");
var search_discard_1 = require("./discard/search_discard");
var ReportsModule = (function () {
    function ReportsModule() {
    }
    ReportsModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                reports_route_1.routing,
                primeng_1.ChartModule,
                primeng_1.CalendarModule,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule,
            ],
            declarations: [
                list_report_component_1.ListReportComponent,
                list_statistic_inform_component_1.ListStatisticInformComponent,
                list_verify_comoponent_1.ListStatisticsVerifyComponent,
                statistics_informing_component_1.StatisticsInformingComponent,
                report_statistics_informing_barchart_component_1.StatisticsInformingBarchart,
                report_statistics_informing_linechart_component_1.StatisticsInformingLinechart,
                statistics_verify_request_component_1.StatisticsVerifyRequestComponent,
                report_statistics_verify_request_component_1.ReportStatisticsVerifyRequestComponent,
                report_statistics_verify_request_linechart_component_1.ReportStatisticsVerifyRequestLinechart,
                list_discard_component_1.ListDiscardComponent,
                search_discard_1.SearchDiscard
            ],
            providers: [
                notification_rest_obj_service_1.NotificationRestObjectService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ReportsModule);
    return ReportsModule;
}());
exports.ReportsModule = ReportsModule;
//# sourceMappingURL=reports.module.js.map