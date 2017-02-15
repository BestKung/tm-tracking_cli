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
var calendar_custom_component_1 = require("../../component/calendar/calendar_custom.component");
var shared_module_1 = require("../../shared/shared.module");
var autocomplete_1 = require("primeng/components/autocomplete/autocomplete");
var list_timer_kohs_component_1 = require("./list_timer_kohs.component");
var search_timer_kohs_component_1 = require("./search_timer_kohs.component");
var kohs_routing_1 = require("./kohs.routing");
/**
 * Created by neng on 2/8/17.
 */
var TimerKohsModule = (function () {
    function TimerKohsModule() {
    }
    TimerKohsModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                kohs_routing_1.routing,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule,
                autocomplete_1.AutoCompleteModule,
            ],
            declarations: [
                list_timer_kohs_component_1.ListTimerKohsComponent,
                search_timer_kohs_component_1.SearchTimerKohsComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TimerKohsModule);
    return TimerKohsModule;
}());
exports.TimerKohsModule = TimerKohsModule;
//# sourceMappingURL=kohs.module.js.map