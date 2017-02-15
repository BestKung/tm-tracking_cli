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
 * Created by neng on 21/10/2559.
 */
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var calendar_1 = require("primeng/components/calendar/calendar");
var calendar_custom_component_1 = require("../component/calendar/calendar_custom.component");
var list_document_component_1 = require("./list_document.component");
var print_return_request_component_1 = require("./print_return_request.component");
var document_routing_1 = require("./document.routing");
var shared_module_1 = require("../shared/shared.module");
var DocumentModule = (function () {
    function DocumentModule() {
    }
    DocumentModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                document_routing_1.routing,
                calendar_1.CalendarModule,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                list_document_component_1.ListDocumentComponent,
                print_return_request_component_1.PrintReturnRequestComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DocumentModule);
    return DocumentModule;
}());
exports.DocumentModule = DocumentModule;
//# sourceMappingURL=document.module.js.map