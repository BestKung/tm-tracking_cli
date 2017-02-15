"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var FollowRenewTableContentComponent = (function () {
    function FollowRenewTableContentComponent() {
    }
    FollowRenewTableContentComponent.prototype.clear = function () {
        console.log('in clear');
    };
    FollowRenewTableContentComponent.prototype.search = function () {
        console.log('in search');
    };
    return FollowRenewTableContentComponent;
}());
FollowRenewTableContentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'table-renew-content',
        templateUrl: './follow_renew_table_content.html'
    })
], FollowRenewTableContentComponent);
exports.FollowRenewTableContentComponent = FollowRenewTableContentComponent;
//# sourceMappingURL=follow_renew_table_content.component.js.map