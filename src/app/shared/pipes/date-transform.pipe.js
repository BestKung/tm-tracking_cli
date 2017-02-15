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
 * Created by neng on 23/10/2559.
 */
var core_1 = require("@angular/core");
var DateThaiTransformPipe = (function () {
    function DateThaiTransformPipe() {
    }
    DateThaiTransformPipe.prototype.transform = function (value, options) {
        if (options === void 0) { options = { year: 'numeric', month: '2-digit', day: '2-digit' }; }
        console.log(typeof value, value);
        if (value) {
            if ((typeof value) == 'string') {
                value = new Date(value);
            }
            return value.toLocaleDateString("th-TH", options);
        }
        else {
            return "";
        }
    };
    DateThaiTransformPipe = __decorate([
        core_1.Pipe({
            name: 'datethai'
        }), 
        __metadata('design:paramtypes', [])
    ], DateThaiTransformPipe);
    return DateThaiTransformPipe;
}());
exports.DateThaiTransformPipe = DateThaiTransformPipe;
//# sourceMappingURL=date-transform.pipe.js.map