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
 * Created by pramoth on 10/2/2016 AD.
 */
var core_1 = require("@angular/core");
var EvidenceTreeComponent = (function () {
    function EvidenceTreeComponent() {
        this.completed = new core_1.EventEmitter();
    }
    EvidenceTreeComponent.prototype.setDeleteStatus = function (event) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ", event);
        this.completed.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EvidenceTreeComponent.prototype, "evidences", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], EvidenceTreeComponent.prototype, "completed", void 0);
    EvidenceTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'evidence-tree',
            templateUrl: 'evidence_tree.html'
        }), 
        __metadata('design:paramtypes', [])
    ], EvidenceTreeComponent);
    return EvidenceTreeComponent;
}());
exports.EvidenceTreeComponent = EvidenceTreeComponent;
//# sourceMappingURL=evidence_tree.component.js.map