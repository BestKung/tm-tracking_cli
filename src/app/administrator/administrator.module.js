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
 * Created by best on 10/9/2559.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic/ng-semantic");
var administrator_routing_1 = require("./administrator.routing");
var administrator_list_component_1 = require("./administrator_list.component");
var deadlines_send_document_component_1 = require("./deadlines_send_document/deadlines_send_document.component");
var population_duedate_component_1 = require("./nontification/population-duedate/population_duedate.component");
var effectivedate_act_facilitate_component_1 = require("./effectivedate_act_facilitate/effectivedate_act_facilitate.component");
var shared_module_1 = require("../shared/shared.module");
var manage_act_component_1 = require("./manage_act/manage_act.component");
var evidence_table_component_1 = require("./evidence/evidence_table.component");
var evidence_tree_component_1 = require("./evidence/evidence_tree.component");
var email_message_component_1 = require("./email_message/email_message.component");
var map_message_button_component_1 = require("./email_message/map_message_button.component");
var inform_message_component_1 = require("./inform_message/inform_message.component");
var email_test_component_1 = require("./email_message/test/email_test.component");
var calendar_1 = require("../component/datepicker/calendar");
var menage_stop_duration_component_1 = require("./manage_stop_duration/menage_stop_duration.component");
var cancellation_component_1 = require("./cancellation/cancellation.component");
var administrator_evidence_component_1 = require("./evidence/administrator_evidence.component");
var stop_duration_component_1 = require("./stop_duration/stop_duration.component");
var matra40_component_1 = require("./cancellation/matra40/matra40.component");
var AdministratorModule = (function () {
    function AdministratorModule() {
    }
    AdministratorModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                administrator_routing_1.routing,
                calendar_1.GTCalendarModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                administrator_list_component_1.AdministratorListComponent,
                administrator_evidence_component_1.EvidenceComponent,
                deadlines_send_document_component_1.DeadlinesSendDocument,
                population_duedate_component_1.NontificationPopulationDuedate,
                effectivedate_act_facilitate_component_1.EffectivedateActFacilitateComponent,
                manage_act_component_1.ManageAct,
                evidence_table_component_1.EvidenceTableComponent,
                evidence_tree_component_1.EvidenceTreeComponent,
                email_message_component_1.EmailMessageComponent,
                map_message_button_component_1.MapMessageButtonComponent,
                inform_message_component_1.InformMessageComponent,
                email_test_component_1.EmailTestComponent,
                menage_stop_duration_component_1.ManageStopDurationComponent,
                cancellation_component_1.CancellationComponent,
                stop_duration_component_1.StopDurationComponent,
                matra40_component_1.CancellationMatra40Component
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AdministratorModule);
    return AdministratorModule;
}());
exports.AdministratorModule = AdministratorModule;
//# sourceMappingURL=administrator.module.js.map