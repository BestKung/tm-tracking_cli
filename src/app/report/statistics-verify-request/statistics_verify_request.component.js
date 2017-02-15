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
 * Created by best on 8/9/2559.
 */
var core_1 = require("@angular/core");
var search_services_and_examine_statistics_component_1 = require("../services-and-examine/search_services_and_examine_statistics_component");
var http_1 = require("@angular/http");
var StatisticsVerifyRequestComponent = (function () {
    function StatisticsVerifyRequestComponent(_http) {
        this._http = _http;
        this.search = new search_services_and_examine_statistics_component_1.SearchServiceAndExamineStatistic();
        this.graphData = [];
        this.textLabel = [];
        this.labelMap = [];
        this.valueMapper = [];
    }
    StatisticsVerifyRequestComponent.prototype.ngOnInit = function () {
    };
    StatisticsVerifyRequestComponent.prototype.searchAction = function () {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('createDateFrom', (this.search.createDateFrom == undefined ? null : this.search.createDateFrom + "") || null);
        params.set('createDateTo', (this.search.createDateTo == undefined ? null : this.search.createDateTo + "") || null);
        this._http.get('/api/service-examine/stat2', { search: params }).map(function (resp) { return resp.json(); }).subscribe(function (resp) {
            _this.valueMapper = resp;
            _this.graphData = resp;
            _this.prepareDataToGraph(_this.graphData);
            console.log(resp);
        });
    };
    StatisticsVerifyRequestComponent.prototype.prepareDataToGraph = function (graphData) {
        this.labelMap = [];
        for (var _i = 0, graphData_1 = graphData; _i < graphData_1.length; _i++) {
            var itm = graphData_1[_i];
            if (this.labelMap.length == 0) {
                this.labelMap.push((_a = {}, _a[itm.month] = itm.month, _a));
            }
            else {
                for (var _b = 0, _c = this.labelMap; _b < _c.length; _b++) {
                    var lb = _c[_b];
                    if (!(itm.month in lb)) {
                        this.labelMap.push((_d = {}, _d[itm.month] = itm.month, _d));
                    }
                }
            }
        }
        this.extractLabel();
        this.extractValue();
        var _a, _d;
    };
    StatisticsVerifyRequestComponent.prototype.extractLabel = function () {
        console.log('label ', this.labelMap);
        this.textLabel = [];
        for (var _i = 0, _a = this.labelMap; _i < _a.length; _i++) {
            var itm = _a[_i];
            for (var key in itm) {
                if (this.textLabel.length == 0) {
                    this.textLabel.push(itm[key]);
                }
                for (var _b = 0, _c = this.textLabel; _b < _c.length; _b++) {
                    var lb = _c[_b];
                    if (lb === itm[key]) {
                        break;
                    }
                    else {
                        this.textLabel.push(itm[key]);
                    }
                }
            }
        }
    };
    StatisticsVerifyRequestComponent.prototype.extractValue = function () {
        this.valueMapper = [];
        for (var _i = 0, _a = this.textLabel; _i < _a.length; _i++) {
            var itm = _a[_i];
            var data = (_b = {}, _b[itm] = [(_c = {}, _c['CREATE_DATE'] = 0, _c), (_d = {}, _d['INVOKED_DATE'] = 0, _d), (_e = {}, _e['BOOK_DATE'] = 0, _e)], _b);
            this.valueMapper.push(data);
        }
        console.log('draft value = ', this.valueMapper);
        for (var _f = 0, _g = this.graphData; _f < _g.length; _f++) {
            var itm = _g[_f];
            for (var _h = 0, _j = this.valueMapper; _h < _j.length; _h++) {
                var draft = _j[_h];
                console.log(itm);
                console.log(draft[itm.month]);
                for (var _k = 0, _l = draft[itm.month]; _k < _l.length; _k++) {
                    var data = _l[_k];
                    if (data.hasOwnProperty(itm.type)) {
                        data[itm.type] = itm.count;
                    }
                }
            }
        }
        console.log('current value = ', this.valueMapper);
        var _b, _c, _d, _e;
    };
    StatisticsVerifyRequestComponent.prototype.clear = function () {
        this.search = new search_services_and_examine_statistics_component_1.SearchServiceAndExamineStatistic();
    };
    StatisticsVerifyRequestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'statistics-verify_request',
            templateUrl: 'statistics_verify_request.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], StatisticsVerifyRequestComponent);
    return StatisticsVerifyRequestComponent;
}());
exports.StatisticsVerifyRequestComponent = StatisticsVerifyRequestComponent;
var StatisticValue = (function () {
    function StatisticValue() {
    }
    return StatisticValue;
}());
exports.StatisticValue = StatisticValue;
var GraphData = (function () {
    function GraphData() {
    }
    return GraphData;
}());
exports.GraphData = GraphData;
var GraphData2 = (function () {
    function GraphData2() {
    }
    return GraphData2;
}());
exports.GraphData2 = GraphData2;
//# sourceMappingURL=statistics_verify_request.component.js.map