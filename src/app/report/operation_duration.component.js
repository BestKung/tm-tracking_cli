"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var OperationDurationComponent = (function () {
    function OperationDurationComponent() {
    }
    OperationDurationComponent.prototype.clear = function () {
        console.log('in clear');
    };
    OperationDurationComponent.prototype.search = function () {
        console.log('in search');
    };
    OperationDurationComponent.prototype.excelDownload = function () {
        console.log('in excel download');
    };
    OperationDurationComponent.prototype.pdfDownload = function () {
        console.log('in pdf download');
    };
    return OperationDurationComponent;
}());
OperationDurationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'operation-duration',
        templateUrl: './operation_duration.html'
    })
], OperationDurationComponent);
exports.OperationDurationComponent = OperationDurationComponent;
//# sourceMappingURL=operation_duration.component.js.map