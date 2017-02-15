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
 * Created by pramoth on 8/31/2016 AD.
 */
var core_1 = require("@angular/core");
var verify_evidence_routing_1 = require("./verify_evidence.routing");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var forms_1 = require("@angular/forms");
var agreement_component_1 = require("./agreement/agreement.component");
var calendar_custom_component_1 = require("../component/calendar/calendar_custom.component");
var checklist_btn_component_1 = require("./component/checklist-btn.component");
var list_evidence_component_1 = require("./list_evidence.component");
var search_evidence_component_1 = require("./search/search_evidence.component");
var checklist_tree_component_1 = require("./agreement/checklist_tree.component");
var checklist_table_1 = require("./agreement/checklist_table");
var checklist_page_component_1 = require("./agreement/checklist_page.component");
var rest_object_service_1 = require("../core/rest_object.service");
var calendar_1 = require("primeng/components/calendar/calendar");
var shared_module_1 = require("../shared/shared.module");
var location_autocomplete_service_1 = require("../shared/service/location-autocomplete.service");
var contract_autocomplete_service_1 = require("../shared/service/contract-autocomplete.service");
var verify_evidence_rest_obj_service_1 = require("../shared/service/verify-evidence.rest-obj.service");
var dropdown_1 = require("primeng/components/dropdown/dropdown");
var VerifyEvidenceModule = (function () {
    function VerifyEvidenceModule() {
    }
    VerifyEvidenceModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                // HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                verify_evidence_routing_1.routing,
                calendar_1.CalendarModule,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                dropdown_1.DropdownModule
            ],
            declarations: [
                search_evidence_component_1.SearchComponent,
                list_evidence_component_1.ListEvidenceComponent,
                agreement_component_1.AgreementComponent,
                checklist_btn_component_1.CheckListButtonComponent,
                checklist_page_component_1.CheckListPageComponent,
                checklist_tree_component_1.ChecklistTreeComponent,
                checklist_table_1.CheckListTableComponent
            ],
            providers: [
                rest_object_service_1.RestObjectService,
                location_autocomplete_service_1.LocationAutocompleteService,
                contract_autocomplete_service_1.ContractAutoCompleteService,
                verify_evidence_rest_obj_service_1.VerifyEvidenceRestObjectService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], VerifyEvidenceModule);
    return VerifyEvidenceModule;
}());
exports.VerifyEvidenceModule = VerifyEvidenceModule;
//# sourceMappingURL=verify_evidence.module.js.map