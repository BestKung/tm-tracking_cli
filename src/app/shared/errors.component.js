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
 * Created by best on 27/10/2559.
 */
var core_1 = require("@angular/core");
var http_status_bus_1 = require("./http_status_bus");
var ErrorsComponent = (function () {
    function ErrorsComponent(httpStatus) {
        var _this = this;
        this.httpStatus = httpStatus;
        this.violation = '';
        this.message = '';
        httpStatus.completed.subscribe(function (data) {
            _this.message = '';
        });
        httpStatus.error.subscribe(function (err) {
            if (err.json().type == 'validation') {
                if (_this.violation) {
                    if (err.json().violations[_this.violation]) {
                        _this.message = err.json().violations[_this.violation].message;
                    }
                }
                if (!_this.violation) {
                    _this.message = err.json().violations.message.message;
                }
            }
        });
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ErrorsComponent.prototype, "violation", void 0);
    ErrorsComponent = __decorate([
        core_1.Component({
            selector: 'gt-errors',
            template: "\n        <label style=\"color: red\">{{message}}</label>\n             "
        }), 
        __metadata('design:paramtypes', [http_status_bus_1.HttpStatusBus])
    ], ErrorsComponent);
    return ErrorsComponent;
}());
exports.ErrorsComponent = ErrorsComponent;
//# sourceMappingURL=errors.component.js.map