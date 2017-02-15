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
 * Created by best on 3/10/2559.
 */
var core_1 = require("@angular/core");
/**
 * Created by best on 3/10/2559.
 */
var TagColoeFollowTrademarkComponent = (function () {
    function TagColoeFollowTrademarkComponent() {
        this.stepDescription = 'หมายเหตุ';
        this.durationType = 'วัน';
        this.position = 'right';
        this.durationDescGreen = '';
        this.durationDescYellow = '';
        this.durationDescOrange = '';
        this.showPopup = false;
    }
    TagColoeFollowTrademarkComponent.prototype.ngOnInit = function () {
        this.checkColorForShowDurationStep();
        if (this.durationGreen && this.durationYellow && this.durationOrange) {
            this.checkDuration();
            this.checkPosition();
            this.showPopup = true;
        }
    };
    TagColoeFollowTrademarkComponent.prototype.checkColorForShowDurationStep = function () {
        if (this.restPercenDuration > this.percenYellow) {
            this.color = ['ui', 'tag', 'label', 'green'];
        }
        if (this.restPercenDuration > this.percentOrange && this.restPercenDuration <= this.percenYellow) {
            this.color = ['ui', 'tag', 'label', 'yellow'];
        }
        if (this.restPercenDuration > 0 && this.restPercenDuration <= this.percentOrange) {
            this.color = ['ui', 'tag', 'label', 'orange'];
        }
        if (this.restPercenDuration <= 0) {
            this.color = ['ui', 'tag', 'label', 'red'];
        }
    };
    TagColoeFollowTrademarkComponent.prototype.checkDuration = function () {
        var yellow;
        var orange;
        this.durationDescOrange = 'แถบสีส้ม = เหลือระยะเวลา 1 - ' + this.durationOrange + ' ' + this.durationType;
        this.durationDescGreen = 'แถบเขียว = เหลือระยะเวลา' + (this.durationYellow + 1) + ' - ' + this.durationGreen + ' ' + this.durationType;
        this.durationDescYellow = 'แถบสีเหลือง = เหลือระยะเวลา' + (this.durationOrange + 1) + ' - ' + this.durationYellow + ' ' + this.durationType;
        if ('เดือน' == this.durationType) {
            if (this.durationOrange <= 3) {
                orange = this.durationOrange * 30;
                var durationTypeLocal = 'วัน';
                this.durationDescYellow = 'แถบสีเหลือง = เหลือระยะเวลา' + (orange + 1) + ' วัน - ' + this.durationYellow + ' ' + this.durationType;
                this.durationDescOrange = 'แถบสีส้ม = เหลือระยะเวลา 1 - ' + orange + ' ' + durationTypeLocal;
            }
            if (this.durationYellow <= 3) {
                yellow = this.durationYellow * 30;
                var durationTypeLocal = 'วัน';
                this.durationDescYellow = 'แถบสีเหลือง = เหลือระยะเวลา' + (orange + 1) + ' - ' + yellow + ' ' + durationTypeLocal;
                this.durationDescGreen = 'แถบเขียว = เหลือระยะเวลา' + (yellow + 1) + ' วัน - ' + this.durationGreen + ' ' + this.durationType;
            }
        }
    };
    TagColoeFollowTrademarkComponent.prototype.checkPosition = function () {
        if (this.position != 'left') {
            this.position = 'right';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TagColoeFollowTrademarkComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TagColoeFollowTrademarkComponent.prototype, "percenGreen", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TagColoeFollowTrademarkComponent.prototype, "percenYellow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TagColoeFollowTrademarkComponent.prototype, "percentOrange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TagColoeFollowTrademarkComponent.prototype, "restPercenDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TagColoeFollowTrademarkComponent.prototype, "stepDescription", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TagColoeFollowTrademarkComponent.prototype, "durationType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TagColoeFollowTrademarkComponent.prototype, "durationGreen", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TagColoeFollowTrademarkComponent.prototype, "durationYellow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TagColoeFollowTrademarkComponent.prototype, "durationOrange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TagColoeFollowTrademarkComponent.prototype, "position", void 0);
    TagColoeFollowTrademarkComponent = __decorate([
        core_1.Component({
            selector: 'tag-color-follow-trademanrk',
            template: "\n               <div style=\"font-size: 10px\" [ngClass]=\"color\" *ngIf=\"showPopup&&position == 'right'\" (click)=\"myPopup.show($event, {position: 'right center'});\">{{label}}</div>\n               <div style=\"font-size: 10px\" [ngClass]=\"color\" *ngIf=\"!showPopup\">{{label}}</div>\n               <div style=\"font-size: 10px\" [ngClass]=\"color\" *ngIf=\"showPopup&&position == 'left'\" (click)=\"myPopup.show($event, {position: 'left center'});\">{{label}}</div>\n               <sm-popup #myPopup>\n               <div>\n    <h4><font color=\"red\"><u>{{stepDescription}}</u></font></h4>\n    <span class=\"ui green label\"></span><label>{{durationDescGreen}}</label><br/>\n    <span class=\"ui yellow label\"></span><label>{{durationDescYellow}}</label><br/>\n    <span class=\"ui orange label\"></span><label>{{durationDescOrange}}</label><br/>\n    <span class=\"ui red label\"></span><label>\u0E41\u0E41\u0E16\u0E1A\u0E2A\u0E35\u0E40\u0E41\u0E14\u0E07 = \u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23</label>\n</div>\n               </sm-popup>\n             "
        }), 
        __metadata('design:paramtypes', [])
    ], TagColoeFollowTrademarkComponent);
    return TagColoeFollowTrademarkComponent;
}());
exports.TagColoeFollowTrademarkComponent = TagColoeFollowTrademarkComponent;
//# sourceMappingURL=tag_collor_follow_teademark.component.js.map