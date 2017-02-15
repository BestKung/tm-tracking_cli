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
var calendar_custom_component_1 = require("../component/calendar/calendar_custom.component");
var shared_module_1 = require("../shared/shared.module");
var timer_routing_1 = require("./timer.routing");
var list_timer_component_1 = require("./list_timer.component");
var koh14_module_1 = require("./koh14/koh14.module");
/**
 * Created by neng on 2/8/17.
 */
var TimerModule = (function () {
    function TimerModule() {
    }
    TimerModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                timer_routing_1.routing,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule,
                koh14_module_1.TimerKoh14Module,
            ],
            declarations: [
                list_timer_component_1.ListTimerComponent,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TimerModule);
    return TimerModule;
}());
exports.TimerModule = TimerModule;
//# sourceMappingURL=timer.module.js.map