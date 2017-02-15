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
 * Created by neng on 9/12/2559.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../../shared/shared.module");
var calendar_1 = require("../../component/datepicker/calendar");
var change_routing_1 = require("./change.routing");
var ng_semantic_1 = require("ng-semantic");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var list_follow_change_component_1 = require("./list_follow_change.component");
var followchange_rest_obj_service_1 = require("../../shared/service/followchange-rest-obj.service");
var change_operational_detail_component_1 = require("./detail/change_operational_detail.component");
var follow_change_search_component_1 = require("./follow_change_search.component");
var detail_change_button_component_1 = require("./detail_change_button.component");
var FollowChangeModule = (function () {
    function FollowChangeModule() {
    }
    FollowChangeModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                change_routing_1.routing,
                calendar_1.GTCalendarModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                list_follow_change_component_1.ListFollowChangeComponent,
                change_operational_detail_component_1.ChangeOperationalDetailComponent,
                follow_change_search_component_1.FollowChangeSearchComponent,
                detail_change_button_component_1.DetailChangeButtonComponent
            ],
            providers: [
                followchange_rest_obj_service_1.FollowChangeRestObjectService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FollowChangeModule);
    return FollowChangeModule;
}());
exports.FollowChangeModule = FollowChangeModule;
//# sourceMappingURL=change.module.js.map