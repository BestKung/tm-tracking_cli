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
var ng_semantic_1 = require("ng-semantic");
var calendar_custom_component_1 = require("../component/calendar/calendar_custom.component");
var shared_module_1 = require("../shared/shared.module");
var common_1 = require("@angular/common");
var manage_status_routing_1 = require("./manage_status.routing");
var matra56_component_1 = require("./matra56/matra56.component");
var list_manage_status_1 = require("./list_manage_status");
var matra40_component_1 = require("./matra40/matra40.component");
/**
 * Created by best on 15/12/2559.
 */
var ManageStatusModule = (function () {
    function ManageStatusModule() {
    }
    ManageStatusModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                manage_status_routing_1.routing,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                list_manage_status_1.ListManageStatusComponent,
                matra56_component_1.Matra56Component,
                matra40_component_1.Matra40Component
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ManageStatusModule);
    return ManageStatusModule;
}());
exports.ManageStatusModule = ManageStatusModule;
//# sourceMappingURL=manage_status.module.js.map