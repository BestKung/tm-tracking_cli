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
var services_and_examine_rounting_1 = require("./services_and_examine.rounting");
var chart_1 = require("primeng/components/chart/chart");
var calendar_1 = require("primeng/components/calendar/calendar");
var calendar_custom_component_1 = require("../../component/calendar/calendar_custom.component");
var shared_module_1 = require("../../shared/shared.module");
var list_service_component_1 = require("./list_service.component");
var search_services_and_examine_statistics_component_1 = require("./search_services_and_examine_statistics_component");
var ServicesAndExamineModule = (function () {
    function ServicesAndExamineModule() {
    }
    ServicesAndExamineModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                services_and_examine_rounting_1.routing,
                chart_1.ChartModule,
                calendar_1.CalendarModule,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule,
            ],
            declarations: [
                list_service_component_1.ListServiceAndExamineComponent,
                search_services_and_examine_statistics_component_1.SearchServicesAndExamineStatistics
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ServicesAndExamineModule);
    return ServicesAndExamineModule;
}());
exports.ServicesAndExamineModule = ServicesAndExamineModule;
//# sourceMappingURL=services_and_examine.module.js.map