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
var shared_module_1 = require("../../shared/shared.module");
var calendar_custom_component_1 = require("../../component/calendar/calendar_custom.component");
var calendar_1 = require("primeng/components/calendar/calendar");
var chart_1 = require("primeng/components/chart/chart");
var announcement_routing_1 = require("./announcement.routing");
var ng_semantic_1 = require("ng-semantic");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var search_announcement_to_population_statistics_component_1 = require("./search_announcement_to_population_statistics_component");
var list_annoucement_component_1 = require("./list_annoucement.component");
var AnnouncementModule = (function () {
    function AnnouncementModule() {
    }
    AnnouncementModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                announcement_routing_1.routing,
                chart_1.ChartModule,
                calendar_1.CalendarModule,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule,
            ],
            declarations: [
                list_annoucement_component_1.ListAnnouncementComponent,
                search_announcement_to_population_statistics_component_1.SearchAnnouncementToPopulationStatistics,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AnnouncementModule);
    return AnnouncementModule;
}());
exports.AnnouncementModule = AnnouncementModule;
//# sourceMappingURL=announcement.module.js.map