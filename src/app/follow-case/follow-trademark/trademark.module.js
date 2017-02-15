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
var trademark_routing_1 = require("./trademark.routing");
var ng_semantic_1 = require("ng-semantic");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var list_follow_trademark_component_1 = require("./list_follow_trademark.component");
var detail_of_operation_component_1 = require("./detail/detail_of_operation.component");
var trademark_search_component_1 = require("./trademark_search.component");
var followtm_rest_obj_service_1 = require("../../shared/service/followtm-rest-obj.service");
var detail_trademark_button_1 = require("./detail_trademark_button");
'';
var TrademarkModule = (function () {
    function TrademarkModule() {
    }
    TrademarkModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                trademark_routing_1.routing,
                calendar_1.GTCalendarModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                list_follow_trademark_component_1.ListFollowTradeMarkComponent,
                detail_of_operation_component_1.DetailOfOperation,
                trademark_search_component_1.TrademarkSearch,
                detail_trademark_button_1.DetailTrademarkButton
            ],
            providers: [
                followtm_rest_obj_service_1.FollowTrademarkRestObjectService,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TrademarkModule);
    return TrademarkModule;
}());
exports.TrademarkModule = TrademarkModule;
//# sourceMappingURL=trademark.module.js.map