/**
 * Created by neng on 19/9/2559.
 */
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
var router_1 = require("@angular/router");
var CheckListButtonComponent = (function () {
    function CheckListButtonComponent(router) {
        this.router = router;
    }
    CheckListButtonComponent.prototype.goToChecklistPage = function () {
        var redirectUrl = ['/verify-evidences/checklist', this.formId];
        this.router.navigate(redirectUrl);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CheckListButtonComponent.prototype, "formId", void 0);
    CheckListButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "checklist-component",
            template: "\n<a class=\"ui tiny primary button\" (click)=\"goToChecklistPage()\">\n    \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\n</a>\n"
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], CheckListButtonComponent);
    return CheckListButtonComponent;
}());
exports.CheckListButtonComponent = CheckListButtonComponent;
//# sourceMappingURL=checklist-btn.component.js.map