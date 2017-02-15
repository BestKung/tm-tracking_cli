/**
 * Created by best on 5/9/2559.
 */
import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'statistics-informing-barchart',
    templateUrl: 'report_statistics_informing_barchart.html'
})

export class StatisticsInformingBarchart {

    data:any;

    options:any;

    constructor() {
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
