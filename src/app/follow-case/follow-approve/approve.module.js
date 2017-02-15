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
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var approve_routing_1 = require("./approve.routing");
var calendar_1 = require("../../component/datepicker/calendar");
var shared_module_1 = require("../../shared/shared.module");
var approve_operation_details_component_1 = require("./approve-operation-details/approve_operation_details.component");
var follow_approve_search_component_1 = require("./follow_approve_search.component");
var detail_approve_button_component_1 = require("./detail_approve_button.component");
var followapprove_rest_obj_service_1 = require("../../shared/service/followapprove-rest-obj.service");
var list_follow_approve_component_1 = require("./list_follow_approve.component");
var ApproveModule = (function () {
    function ApproveModule() {
    }
    ApproveModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                approve_routing_1.routing,
                calendar_1.GTCalendarModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                list_follow_approve_component_1.ListFollowApproveComponent,
                approve_operation_details_component_1.ApproveOperationDetailsComponent,
                follow_approve_search_component_1.FollowApproveSearchComponent,
                detail_approve_button_component_1.DetailApproveButtonComponent,
            ],
            providers: [
                followapprove_rest_obj_service_1.FollowApproveRestObjectService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ApproveModule);
    return ApproveModule;
}());
exports.ApproveModule = ApproveModule;
//# sourceMappingURL=approve.module.js.map