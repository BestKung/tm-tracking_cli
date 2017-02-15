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
 * Created by neng on 2/8/17.
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var ng_semantic_1 = require("ng-semantic");
var calendar_custom_component_1 = require("../../component/calendar/calendar_custom.component");
var shared_module_1 = require("../../shared/shared.module");
var list_timer_koh14_component_1 = require("./list_timer_koh14.component");
var forms_1 = require("@angular/forms");
var search_timer_koh14_component_1 = require("./search_timer_koh14.component");
var koh14_routing_1 = require("./koh14.routing");
var dropdown_1 = require("primeng/components/dropdown/dropdown");
var autocomplete_1 = require("primeng/components/autocomplete/autocomplete");
var TimerKoh14Module = (function () {
    function TimerKoh14Module() {
    }
    TimerKoh14Module = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                koh14_routing_1.routing,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule,
                dropdown_1.DropdownModule,
                autocomplete_1.AutoCompleteModule,
            ],
            declarations: [
                list_timer_koh14_component_1.ListTimerKoh14Component,
                search_timer_koh14_component_1.SearchTimerKoh14Component
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TimerKoh14Module);
    return TimerKoh14Module;
}());
exports.TimerKoh14Module = TimerKoh14Module;
//# sourceMappingURL=koh14.module.js.map