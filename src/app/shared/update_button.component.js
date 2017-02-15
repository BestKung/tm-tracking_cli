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
 * Created by best on 12/9/2559.
 */
var core_1 = require("@angular/core");
var UpdateButtonComponent = (function () {
    function UpdateButtonComponent() {
        this.label = 'Update';
        this.updateEvent = new core_1.EventEmitter();
    }
    UpdateButtonComponent.prototype.onUpdate = function ($event) {
        this.updateEvent.emit(this.key);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UpdateButtonComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UpdateButtonComponent.prototype, "key", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], UpdateButtonComponent.prototype, "updateEvent", void 0);
    UpdateButtonComponent = __decorate([
        core_1.Component({
            selector: 'update-button',
            template: "<button class=\"ui teal button\" (click)=\"onUpdate($event)\">{{label}}</button>"
        }), 
        __metadata('design:paramtypes', [])
    ], UpdateButtonComponent);
    return UpdateButtonComponent;
}());
exports.UpdateButtonComponent = UpdateButtonComponent;
//# sourceMappingURL=update_button.component.js.map