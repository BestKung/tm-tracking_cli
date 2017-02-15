"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by pramoth on 8/31/2016 AD.
 */
var core_1 = require("@angular/core");
var list_documents_component_1 = require("./list_documents.component");
var search_ducument_component_1 = require("./search/search_ducument.component");
var verify_document_routing_1 = require("./verify_document.routing");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var agreement_component_1 = require("./agreement/agreement.component");
var calendar_custom_component_1 = require("../component/calendar/calendar_custom.component");
var vertify_document_service_1 = require("./service/vertify-document.service");
var checklist_page_component_1 = require("./agreement/checklist-page.component");
var checklist_btn_component_1 = require("./component/checklist-btn.component");
var VerifyDocumentModule = (function () {
    function VerifyDocumentModule() {
    }
    return VerifyDocumentModule;
}());
VerifyDocumentModule = __decorate([
    core_1.NgModule({
        imports: [forms_1.FormsModule, http_1.HttpModule, common_1.CommonModule, verify_document_routing_1.routing, ng_semantic_1.NgSemanticModule, calendar_custom_component_1.CalendarGTModule],
        declarations: [search_ducument_component_1.SearchComponent, list_documents_component_1.ListDocumentComponent, agreement_component_1.AgreementComponent, checklist_btn_component_1.CheckListButtonComponent, checklist_page_component_1.CheckListPageComponent],
        providers: [vertify_document_service_1.VertifyDocumentService]
    })
], VerifyDocumentModule);
exports.VerifyDocumentModule = VerifyDocumentModule;
//# sourceMappingURL=verify_document.module.js.map