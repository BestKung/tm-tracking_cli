"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var list_acknowledgement_component_1 = require("./list_acknowledgement.component");
var acknowledgement_routing_1 = require("./acknowledgement.routing");
var acknowledgement_component_1 = require("./acknowledgement.component");
var calendar_custom_component_1 = require("../component/calendar/calendar_custom.component");
var calendar_1 = require("primeng/components/calendar/calendar");
var AcknowledgementModule = (function () {
    function AcknowledgementModule() {
    }
    return AcknowledgementModule;
}());
AcknowledgementModule = __decorate([
    core_1.NgModule({
        imports: [forms_1.FormsModule, http_1.HttpModule, common_1.CommonModule, ng_semantic_1.NgSemanticModule, acknowledgement_routing_1.routing, calendar_1.CalendarModule, calendar_custom_component_1.CalendarGTModule],
        declarations: [list_acknowledgement_component_1.ListAcknowledgement, acknowledgement_component_1.AcknowledgementComponent]
    })
], AcknowledgementModule);
exports.AcknowledgementModule = AcknowledgementModule;
//# sourceMappingURL=acknowledgement.module.js.map