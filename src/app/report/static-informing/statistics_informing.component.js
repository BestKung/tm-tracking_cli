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
var http_1 = require("@angular/http");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var StatisticsInformingComponent = (function () {
    function StatisticsInformingComponent(http, toaStr) {
        this.http = http;
        this.toaStr = toaStr;
        this.dataBarChart = { labels: [], datasets: [] };
        this.dataLineChart = { labels: [], datasets: [] };
        this.options = { title: {}, legend: {}, scales: {} };
        this.searchRequest = new SearchStatisticInforming();
    }
    StatisticsInformingComponent.prototype.ngOnInit = function () {
        this.clear();
    };
    StatisticsInformingComponent.prototype.search = function () {
        var _this = this;
        if (!this.searchRequest.startDate) {
            this.isErrorStartDate = true;
            this.toaStr.warning('กรอกข้อมูลให้ครบถ้วน');
            return;
        }
        if (!this.searchRequest.endDate) {
            this.isErrorEndDate = true;
            this.toaStr.warning('กรอกข้อมูลให้ครบถ้วน');
            return;
        }
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('startDate', this.searchRequest.startDate);
        params.set('endDate', this.searchRequest.endDate);
        this.showGraph = true;
        this.http.get('/api/nontification-delayed-template/graph', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (reponse) {
            var dataBar = new Array();
            var dataLine = new Array();
            var month = new Array();
            for (var i = 0; i < reponse.length; i++) {
                dataBar.push(reponse[i].total);
                dataLine.push(reponse[i].total);
                month.push(reponse[i].month);
            }
            dataBar.push(0);
            _this.loadGraph(month, dataBar, dataLine, reponse[0].monthYear.replace('   ', ' ') + " - " + reponse[reponse.length - 1].monthYear.replace('   ', ' '));
            _this.isErrorStartDate = false;
            _this.isErrorEndDate = false;
        });
    };
    StatisticsInformingComponent.prototype.loadGraph = function (month, dataBar, dataLine, text) {
        this.dataBarChart = {
            labels: month,
            datasets: [
                {
                    label: 'จำนวนการเเจ้งประชาชน',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: dataBar
                }
            ]
        };
        this.dataLineChart = {
            labels: month,
            datasets: [
                {
                    label: 'จำนวนการเเจ้งประชาชน',
                    fill: false,
                    borderColor: '#4bc0c0',
                    data: dataLine
                }
            ]
        };
        this.options = {
            title: {
                display: true,
                text: 'รายละเอียดรายงานสถิติการเเจ้งประชาชน ' + text,
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            },
            scales: {
                yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'จำนวนประชาชน',
                            fontSize: 16
                        }
                    }],
                xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'เดือน',
                            fontSize: 16
                        }
                    }]
            }
        };
    };
    StatisticsInformingComponent.prototype.clear = function () {
        this.showGraph = false;
        this.isErrorStartDate = false;
        this.isErrorEndDate = false;
        this.searchRequest = new SearchStatisticInforming();
    };
    StatisticsInformingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'statistics-informing',
            templateUrl: 'statistics_informing.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], StatisticsInformingComponent);
    return StatisticsInformingComponent;
}());
exports.StatisticsInformingComponent = StatisticsInformingComponent;
var SearchStatisticInforming = (function () {
    function SearchStatisticInforming() {
    }
    return SearchStatisticInforming;
}());
exports.SearchStatisticInforming = SearchStatisticInforming;
//# sourceMappingURL=statistics_informing.component.js.map