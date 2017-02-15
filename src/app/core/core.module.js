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
var common_1 = require("@angular/common");
var rest_object_service_1 = require("./rest_object.service");
var absence_agreement_service_1 = require("./absence-agreement.service");
/**
 * Created by neng on 11/12/2559.
 */
var CoreModule = (function () {
    function CoreModule() {
    }
    CoreModule.forRoot = function () {
        return {
            ngModule: CoreModule
        };
    };
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            providers: [
                rest_object_service_1.RestObjectService,
                absence_agreement_service_1.AbsenceAgreementService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map