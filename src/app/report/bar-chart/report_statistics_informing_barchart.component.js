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
 * Created by best on 5/9/2559.
 */
var core_1 = require("@angular/core");
var StatisticsInformingBarchart = (function () {
    function StatisticsInformingBarchart() {
        this.data = {
            labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน'],
            datasets: [
                {
                    label: 'จำนวนการเเจ้งประชาชน',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [250, 400, 600, 300, 400, 600, 0]
                }
            ]
        };
        this.options = {
            title: {
                display: true,
                text: 'รายละเอียดรายงานสถิติการเเจ้งประชาชน 2559 เดือน มกราคม - มิถุนายน',
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
    }
    ;
    StatisticsInformingBarchart = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'statistics-informing-barchart',
            templateUrl: 'report_statistics_informing_barchart.html'
        }), 
        __metadata('design:paramtypes', [])
    ], StatisticsInformingBarchart);
    return StatisticsInformingBarchart;
}());
exports.StatisticsInformingBarchart = StatisticsInformingBarchart;
//# sourceMappingURL=report_statistics_informing_barchart.component.js.map