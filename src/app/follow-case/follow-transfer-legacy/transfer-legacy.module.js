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
var ng_semantic_1 = require("ng-semantic");
var common_1 = require("@angular/common");
var calendar_1 = require("../../component/datepicker/calendar");
var shared_module_1 = require("../../shared/shared.module");
var transfer_legacy_routing_1 = require("./transfer-legacy.routing");
var list_follow_transfer_legacy_component_1 = require("./list_follow_transfer_legacy.component");
var followtransfer_rest_obj_service_1 = require("../../shared/service/followtransfer-rest-obj.service");
var transfer_operation_details_component_1 = require("./transfer-legacy-operation-details/transfer_operation_details.component");
var follow_tranfer_search_component_1 = require("./follow_tranfer_search.component");
var detail_tranfer_button_component_1 = require("./detail_tranfer_button.component");
var TransferLegacyModule = (function () {
    function TransferLegacyModule() {
    }
    TransferLegacyModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                transfer_legacy_routing_1.routing,
                calendar_1.GTCalendarModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                list_follow_transfer_legacy_component_1.ListFollowTransferLegacy,
                transfer_operation_details_component_1.TransferOperationalDetailComponent,
                follow_tranfer_search_component_1.FollowTranferSearchComponent,
                detail_tranfer_button_component_1.DetailTranferButtonComponent
            ],
            providers: [
                followtransfer_rest_obj_service_1.FollowTransferRestObjectService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TransferLegacyModule);
    return TransferLegacyModule;
}());
exports.TransferLegacyModule = TransferLegacyModule;
//# sourceMappingURL=transfer-legacy.module.js.map