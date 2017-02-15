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
var ng_semantic_1 = require("ng-semantic");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var floor3_routing_1 = require("./floor3.routing");
var list_follow_floor3_component_1 = require("./list_follow_floor3.component");
var return_request_component_1 = require("./return-request/return_request.component");
var floor3_search_component_1 = require("./floor3_search.component");
var kor20_component_1 = require("./component/kor20.component");
var absence_evidence_detail_component_1 = require("./component/absence-evidence-detail.component");
var save_return_detail_component_1 = require("./component/save-return-detail.component");
var discard_request_component_1 = require("./component/discard-request.component");
var Floor3Module = (function () {
    function Floor3Module() {
    }
    Floor3Module = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                floor3_routing_1.routing,
                calendar_1.GTCalendarModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                list_follow_floor3_component_1.ListFollowFloor3Component,
                return_request_component_1.ReturnRequestComponent,
                floor3_search_component_1.Floor3Search,
                kor20_component_1.Kor20Component,
                absence_evidence_detail_component_1.AbsenceEvidenceDetailComponent,
                save_return_detail_component_1.SaveReturnDetailComponent,
                discard_request_component_1.DiscardRequestComponent,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Floor3Module);
    return Floor3Module;
}());
exports.Floor3Module = Floor3Module;
//# sourceMappingURL=floor3.module.js.map