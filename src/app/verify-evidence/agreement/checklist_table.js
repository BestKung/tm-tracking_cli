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
 * Created by neng on 3/10/2559.
 */
var core_1 = require("@angular/core");
var form_type_model_1 = require("../../model/form-type-model");
var CheckListTableComponent = (function () {
    function CheckListTableComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CheckListTableComponent.prototype, "evidences", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', form_type_model_1.FormTypeModel)
    ], CheckListTableComponent.prototype, "formType", void 0);
    CheckListTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'checklist-table',
            templateUrl: 'checklist_table.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CheckListTableComponent);
    return CheckListTableComponent;
}());
exports.CheckListTableComponent = CheckListTableComponent;
//# sourceMappingURL=checklist_table.js.map