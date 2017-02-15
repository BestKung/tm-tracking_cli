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
 * Created by best on 15/9/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var population_duedate_1 = require("./population_duedate");
var page_1 = require("../../../shared/page");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var NontificationPopulationDuedate = (function () {
    function NontificationPopulationDuedate(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.nontificationPopulationDuedate = new population_duedate_1.PopulationDuedate();
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
        this.searchAction();
    }
    NontificationPopulationDuedate.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        var nontificationConfObserv;
        var params = new http_1.URLSearchParams();
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        nontificationConfObserv = this.http.get('/api/administrator/nontification-population-duedate/get', { search: params }).map(function (data) { return data.json(); });
        nontificationConfObserv.subscribe(function (data) { return _this.pageData = data; });
    };
    NontificationPopulationDuedate.prototype.save = function () {
        var _this = this;
        this.http.post('/api/administrator/nontification-population-duedate/save', this.nontificationPopulationDuedate)
            .subscribe(function (data) {
            _this.searchAction();
            _this.toastr.success('บันทึกข้อมูลเสร็จสิ้น');
        });
    };
    NontificationPopulationDuedate = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'nontification-population-duedate',
            templateUrl: 'population_duedate.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], NontificationPopulationDuedate);
    return NontificationPopulationDuedate;
}());
exports.NontificationPopulationDuedate = NontificationPopulationDuedate;
//# sourceMappingURL=population_duedate.component.js.map