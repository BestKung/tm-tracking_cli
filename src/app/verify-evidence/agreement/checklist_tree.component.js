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
var ChecklistTreeComponent = (function () {
    function ChecklistTreeComponent() {
    }
    ChecklistTreeComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ChecklistTreeComponent.prototype, "evidences", void 0);
    ChecklistTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'checklist-tree',
            templateUrl: 'checklist_tree.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ChecklistTreeComponent);
    return ChecklistTreeComponent;
}());
exports.ChecklistTreeComponent = ChecklistTreeComponent;
//# sourceMappingURL=checklist_tree.component.js.map