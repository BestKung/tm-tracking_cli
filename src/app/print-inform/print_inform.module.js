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
 * Created by pramoth on 9/1/2016 AD.
 */
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var print_inform_routing_1 = require("./print_inform.routing");
var core_1 = require("@angular/core");
var list_inform_component_1 = require("./list_inform.component");
var search_inform_component_1 = require("./search_inform.component");
var calendar_custom_component_1 = require("../component/calendar/calendar_custom.component");
var print_book_inform_component_1 = require("./print_book_inform/print_book_inform.component");
var shared_module_1 = require("../shared/shared.module");
var PrintInformModule = (function () {
    function PrintInformModule() {
    }
    PrintInformModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                ng_semantic_1.NgSemanticModule,
                print_inform_routing_1.routing,
                calendar_custom_component_1.CalendarGTModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                list_inform_component_1.ListInformComponent,
                search_inform_component_1.SearchInformComponent,
                print_book_inform_component_1.PrintBookInformComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PrintInformModule);
    return PrintInformModule;
}());
exports.PrintInformModule = PrintInformModule;
//# sourceMappingURL=print_inform.module.js.map