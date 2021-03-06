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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var search_letter_inform_component_1 = require("./search_letter_inform.component");
var calendar_custom_component_1 = require("../component/calendar/calendar_custom.component");
var calendar_1 = require("primeng/components/calendar/calendar");
var shared_module_1 = require("../shared/shared.module");
var letter_inform_routing_1 = require("./letter_inform.routing");
var LetterInformModule = (function () {
    function LetterInformModule() {
    }
    LetterInformModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                calendar_custom_component_1.CalendarGTModule,
                calendar_1.CalendarModule,
                shared_module_1.SharedModule,
                letter_inform_routing_1.routing,
            ],
            declarations: [
                search_letter_inform_component_1.SearchLetterInformComponent,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LetterInformModule);
    return LetterInformModule;
}());
exports.LetterInformModule = LetterInformModule;
//# sourceMappingURL=letter_inform.module.js.map