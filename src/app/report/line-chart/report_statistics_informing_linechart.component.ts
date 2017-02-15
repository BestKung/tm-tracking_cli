/**
 * Created by best on 5/9/2559.
 */

import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'statistics-informing_linechart',
    templateUrl: './report_statistics_informing_linechart.html'
})

export class StatisticsInformingLinechart {
    data:any;

    options:any;

    constructor() {
        this.data = {
            labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน'],
            datasets: [
                {
                    label: 'จำนวนการเเจ้งประชาชน',
                    fill: false,
                    borderColor: '#4bc0c0',
                    data: [250, 400, 600, 300, 400, 600,]
                }
            ]
        }

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
        }
    };
}
