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
/**
 * Created by neng on 10/12/2559.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var operation_duration_routing_1 = require("./operation_duration.routing");
var chart_1 = require("primeng/components/chart/chart");
var calendar_1 = require("primeng/components/calendar/calendar");
var calendar_custom_component_1 = require("../../component/calendar/calendar_custom.component");
var shared_module_1 = require("../../shared/shared.module");
var list_operation_duration_component_1 = require("./list_operation_duration.component");
var operation_duration_detail_component_1 = require("./operation_duration_detail.component");
var operation_duration_component_1 = require("./operation_duration.component");
var detail_report_button_component_1 = require("../detail_report_button.component");
var OperationDurationModule = (function () {
    function OperationDurationModule() {
    }
    OperationDurationModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                operation_duration_routing_1.routing,
                chart_1.ChartModule,
                calendar_1.CalendarModule,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule,
            ],
            declarations: [
                list_operation_duration_component_1.ListOperationDurationComponent,
                operation_duration_component_1.OperationDurationComponent,
                operation_duration_detail_component_1.OperationDurationDetailComponent,
                detail_report_button_component_1.DetailReportButtomComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], OperationDurationModule);
    return OperationDurationModule;
}());
exports.OperationDurationModule = OperationDurationModule;
//# sourceMappingURL=operation_duration.module.js.map