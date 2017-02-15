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
 * Created by best on 16/9/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var act_1 = require("../model/act");
var page_1 = require("../../shared/page");
var category_1 = require("../../shared/category");
var category_and_steps_1 = require("./category_and_steps");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var EffectivedateActFacilitateComponent = (function () {
    function EffectivedateActFacilitateComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.acts = new page_1.Page();
        this.category = new category_1.Category();
        this.steps = new Array();
        this.categorys = new page_1.Page();
        this.stepss = new page_1.Page();
        this.act = new act_1.Act();
        this.getAct();
        this.category.act.actId = 'กรุณาเลือกพรบ';
        this.category.name = 'กรุณาเลือกคู่มือ';
    }
    EffectivedateActFacilitateComponent.prototype.getAct = function () {
        var _this = this;
        var actObserv;
        actObserv = this.http.get('/api/act/get').map(function (data) { return data.json(); });
        actObserv.subscribe(function (data) { return _this.acts = data; });
    };
    EffectivedateActFacilitateComponent.prototype.save = function () {
        var _this = this;
        for (var i = 0; i < this.acts.content.length; i++) {
            if (this.acts.content[i].actId = this.category.actId) {
                this.category.act = this.acts.content[i];
            }
        }
        var categoryAndSteps = new category_and_steps_1.CategoryAndStep();
        categoryAndSteps.categoryDto = this.category;
        categoryAndSteps.stepsDto = this.stepss.content;
        this.http.post('/api/category', categoryAndSteps).subscribe(function (data) {
            _this.toastr.success('บันทึกข้อมูลสำเร็จ');
        });
    };
    EffectivedateActFacilitateComponent.prototype.getCategoryByAct = function (value) {
        var _this = this;
        this.category.name = 'กรุณาเลือกคู่มือ';
        this.category = new category_1.Category();
        this.categorys = new page_1.Page();
        this.stepss = new page_1.Page();
        this.findActById(value);
        console.log(value);
        var params = new http_1.URLSearchParams();
        params.set("actId", value || "");
        var categoryObserv;
        categoryObserv = this.http.get('/api/category/search-by-act', { search: params }).map(function (data) { return data.json(); });
        categoryObserv.subscribe(function (data) { return _this.categorys = data; });
    };
    EffectivedateActFacilitateComponent.prototype.getStepByCategory = function (value) {
        var _this = this;
        this.findCategoryById(value);
        var params = new http_1.URLSearchParams();
        params.set("categoryId", value.toString() || "");
        var stepObserv;
        stepObserv = this.http.get('/api/step/search-by-category', { search: params }).map(function (data) { return data.json(); });
        stepObserv.subscribe(function (data) { return _this.stepss = data; });
    };
    EffectivedateActFacilitateComponent.prototype.findCategoryById = function (id) {
        for (var i = 0; i < this.categorys.content.length; i++) {
            if (this.categorys.content[i].id == id) {
                console.log(this.categorys.content[i].name + '=======');
                this.category = this.categorys.content[i];
            }
        }
    };
    EffectivedateActFacilitateComponent.prototype.findActById = function (id) {
        for (var i = 0; i < this.acts.content.length; i++) {
            if (this.acts.content[i].actId == id) {
                this.act = this.acts.content[i];
            }
        }
    };
    EffectivedateActFacilitateComponent.prototype.clear = function () {
        this.category.name = 'กรุณาเลือกคู่มือ';
        this.category = new category_1.Category();
        this.categorys = new page_1.Page();
        this.stepss = new page_1.Page();
        this.act = new act_1.Act();
    };
    EffectivedateActFacilitateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'effectivedate-act-faccilitate',
            templateUrl: 'effectivedate_act_facilitate.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], EffectivedateActFacilitateComponent);
    return EffectivedateActFacilitateComponent;
}());
exports.EffectivedateActFacilitateComponent = EffectivedateActFacilitateComponent;
//# sourceMappingURL=effectivedate_act_facilitate.component.js.map