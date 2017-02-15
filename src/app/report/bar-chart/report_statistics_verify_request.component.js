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
var ReportStatisticsVerifyRequestComponent = (function () {
    function ReportStatisticsVerifyRequestComponent() {
        this._statisticValue = [];
        this._labels = [];
        this.data = { labels: this._labels,
            datasets: [{
                    label: 'หน่วยงานที่รับคำขอ กรมทรัพย์สินย์ทางปัญญา',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: []
                }] };
        this.options = {
            title: {
                display: true,
                text: 'รายงานสถิติกลุ่มบริการเเละตรวจรับคำขอ',
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            },
            scales: {
                yAxes: [{
                        scal0eLabel: {
                            display: true,
                            labelString: 'จำนวนคำร้อง',
                            fontSize: 16
                        }
                    }],
                xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'ประเภทคำร้อง',
                            fontSize: 16
                        }
                    }]
            }
        };
    }
    Object.defineProperty(ReportStatisticsVerifyRequestComponent.prototype, "labels", {
        set: function (labels) {
            this._labels = labels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportStatisticsVerifyRequestComponent.prototype, "statisticValue", {
        set: function (valueMapper) {
            this._statisticValue = valueMapper;
            var slots = this.insertValuesIntoSlot(valueMapper);
            var slot1 = [];
            var slot2 = [];
            var slot3 = [];
            for (var idx = 0; idx < this._labels.length; idx++) {
                slot1[idx] = slots[idx][0];
                slot2[idx] = slots[idx][1];
                slot3[idx] = slots[idx][2];
            }
            console.log(slot1 + " " + slot2 + " " + slot3);
            this.data = {
                labels: this._labels,
                datasets: [
                    {
                        label: 'รายงานสถิติการบันทึกข้อตกลง',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: slot1
                    },
                    {
                        label: 'รายงานสถิติการแจ้งคืนคำขอ',
                        backgroundColor: '#ff7043',
                        borderColor: '#ff7043',
                        data: slot2
                    },
                    {
                        label: 'รายงานสถิติการยื่นอุทธรณ์',
                        backgroundColor: '#A29C9A',
                        borderColor: '#A29C9A',
                        data: slot3
                    }
                ]
            };
        },
        enumerable: true,
        configurable: true
    });
    ReportStatisticsVerifyRequestComponent.prototype.insertValuesIntoSlot = function (valueMapper) {
        //this logic that commented was test on multiple month, because this time coding it has only one month.
        // this._labels.push('ธ.ค. 59');
        // let dataTest: {[id:string]: {[id:string]: number}[]} = {['ธ.ค. 59']: [{['CREATE_DATE']: 10}, {['INVOKED_DATE']: 3}, {['BOOK_DATE']: 9}]};
        // valueMapper.push(dataTest);
        var returnValue = new Array();
        for (var idx = 0; idx < valueMapper.length; idx++) {
            if (valueMapper[idx][this._labels[idx]]) {
                var slot = new Array();
                for (var _i = 0, _a = valueMapper[idx][this._labels[idx]]; _i < _a.length; _i++) {
                    var data = _a[_i];
                    if (data['CREATE_DATE']) {
                        slot[0] = data['CREATE_DATE'];
                    }
                    if (data['BOOK_DATE']) {
                        slot[1] = data['BOOK_DATE'];
                    }
                    if (data['INVOKED_DATE']) {
                        slot[2] = data['INVOKED_DATE'];
                    }
                }
                returnValue[idx] = slot;
            }
        }
        return returnValue;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], ReportStatisticsVerifyRequestComponent.prototype, "labels", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], ReportStatisticsVerifyRequestComponent.prototype, "statisticValue", null);
    ReportStatisticsVerifyRequestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'report-statistics-verify-request',
            templateUrl: 'report_statistics_verify_request.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ReportStatisticsVerifyRequestComponent);
    return ReportStatisticsVerifyRequestComponent;
}());
exports.ReportStatisticsVerifyRequestComponent = ReportStatisticsVerifyRequestComponent;
//# sourceMappingURL=report_statistics_verify_request.component.js.map