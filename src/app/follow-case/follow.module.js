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
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var follow_routing_1 = require("./follow.routing");
var core_1 = require("@angular/core");
var list_follow_component_1 = require("./list_follow.component");
var legend2_component_1 = require("./legends/legend2/legend2_component");
var legend1_component_1 = require("./legends/legend1/legend1_component");
var legend3_component_1 = require("./legends/legend3/legend3_component");
var legend4_component_1 = require("./legends/legend4/legend4_component");
var legend5_component_1 = require("./legends/legend5/legend5_component");
var shared_module_1 = require("../shared/shared.module");
var calendar_1 = require("../component/datepicker/calendar");
var FollowModule = (function () {
    function FollowModule() {
    }
    FollowModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                follow_routing_1.routing,
                calendar_1.GTCalendarModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                list_follow_component_1.ListFollowComponent,
                legend2_component_1.Legend2Component,
                legend1_component_1.Legend1Component,
                legend3_component_1.Legend3Component,
                legend4_component_1.Legend4Component,
                legend5_component_1.Legend5Component,
            ],
            providers: [
                http_1.Jsonp
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FollowModule);
    return FollowModule;
}());
exports.FollowModule = FollowModule;
//# sourceMappingURL=follow.module.js.map