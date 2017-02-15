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
/**
 * Created by best on 16/10/2559.
 */
var MapMessageButtonComponent = (function () {
    function MapMessageButtonComponent() {
        this.label = '';
        this.message = '';
        this.text = '';
        this.clickEvent = new core_1.EventEmitter();
    }
    MapMessageButtonComponent.prototype.onClickMessage = function ($event) {
        if (!this.text) {
            this.text = '';
        }
        this.text = this.text + this.message;
        this.clickEvent.emit(this.text);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MapMessageButtonComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MapMessageButtonComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MapMessageButtonComponent.prototype, "text", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MapMessageButtonComponent.prototype, "clickEvent", void 0);
    MapMessageButtonComponent = __decorate([
        core_1.Component({
            selector: 'map-message-button',
            template: "\n            <button class=\"ui basic button\" style=\"width: 140px;\" (click)=\"onClickMessage($event)\">{{label}}</button>\n             "
        }), 
        __metadata('design:paramtypes', [])
    ], MapMessageButtonComponent);
    return MapMessageButtonComponent;
}());
exports.MapMessageButtonComponent = MapMessageButtonComponent;
//# sourceMappingURL=map_message_button.component.js.map