/**
 * Created by best on 8/9/2559.
 */
import {Component, Input} from "@angular/core";
import {GraphData} from "../statistics-verify-request/statistics_verify_request.component";
@Component({
    moduleId: module.id,
    selector: 'report-statistics-verify-request-inechart',
    templateUrl: 'report_statistics_verify_request_linechart.html'
})
export class ReportStatisticsVerifyRequestLinechart {

    private _statisticValue:{[id:string]: {[id:string]: number}[]}[] = [];
    private _labels: string[] =  [];

    data:any = {labels: this._labels,
        datasets: [{
            label: 'หน่วยงานที่รับคำขอ กรมทรัพย์สินย์ทางปัญญา',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: []
        }]};
    options:any;

    @Input()
    set labels(labels: string[]) {
        this._labels = labels;
        console.log('into line chart, ', this._labels);
    }

    @Input()
    set statisticValue(valueMapper: {[id:string]: {[id:string]: number}[]}[]) {
        this._statisticValue = valueMapper;
        let slots:Array<Array<number>> = this.insertValuesIntoSlot(valueMapper);
        let slot1: number[] = [];
        let slot2: number[] = [];
        let slot3: number[] = [];

        for(let idx = 0; idx < this._labels.length; idx ++) {
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
                    borderColor: '#1E88E5',
                    backgroundColor: '#1E88E5',
                    data: slot1,
                    fill: false
                },
                {
                    label: 'รายงานสถิติการแจ้งคืนคำขอ',
                    borderColor: '#ff7043',
                    backgroundColor: '#ff7043',
                    data: slot2,
                    fill: false
                },
                {
                    label: 'รายงานสถิติการยื่นอุทธรณ์',
                    borderColor: '#A29C9A',
                    backgroundColor: '#A29C9A',
                    data: slot3,
                    fill: false
                }
            ]
        };
    }

    private insertValuesIntoSlot(valueMapper:{[id:string]: {[id:string]: number}[]}[]): Array<Array<number>>{

        //this logic that commented was test on multiple month, because this time coding it has only one month.
        // this._labels.push('ธ.ค. 59');
        // let dataTest: {[id:string]: {[id:string]: number}[]} = {['ธ.ค. 59']: [{['CREATE_DATE']: 10}, {['INVOKED_DATE']: 3}, {['BOOK_DATE']: 9}]};
        // valueMapper.push(dataTest);
        //test it will remove soon.

        let returnValue = new Array<Array<number>>();
        for(let idx = 0; idx < valueMapper.length; idx ++) {
            if(valueMapper[idx][this._labels[idx]]) {
                let slot:Array<number> = new Array<number>();
                for(let data of valueMapper[idx][this._labels[idx]]) {
                    if(data['CREATE_DATE']) {
                        slot[0] = data['CREATE_DATE'];
                    }
                    if(data['BOOK_DATE']) {
                        slot[1] = data['BOOK_DATE'];
                    }
                    if(data['INVOKED_DATE']) {
                        slot[2] = data['INVOKED_DATE'];
                    }
                }
                returnValue[idx] = slot;
            }
        }
        return returnValue;
    }

    constructor() {
        this.options = {
            title: {
                display: true,
                text: 'รายงานสถิติการบันทึกข้อตกลง',
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
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
        }
    };
}
