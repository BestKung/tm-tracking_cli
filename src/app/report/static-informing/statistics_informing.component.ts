import {Component, OnInit} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {StatisticInforming} from "./statictic_informing";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
declare var jQuery:any;

@Component({
    moduleId: module.id,
    selector: 'statistics-informing',
    templateUrl: 'statistics_informing.html'
})

export class StatisticsInformingComponent implements OnInit {
    dataBarChart:any = {labels: [], datasets: []};

    dataLineChart:any = {labels: [], datasets: []};

    options:any = {title: {}, legend: {}, scales: {}};

    searchRequest:SearchStatisticInforming = new SearchStatisticInforming();

    showGraph:boolean;

    isErrorStartDate:boolean;
    isErrorEndDate:boolean;

    constructor(private http:Http, private toaStr:ToastsManager) {

    }

    ngOnInit():void {
        this.clear();
    }

    search():void {
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
        let params = new DateSupportURLSearchParams();
        params.set('startDate', this.searchRequest.startDate);
        params.set('endDate', this.searchRequest.endDate);
        this.showGraph = true;
        this.http.get('/api/nontification-delayed-template/graph', {search: params})
            .map(data=>data.json() as StatisticInforming[])
            .subscribe(reponse=> {
                    let dataBar:Array<number> = new Array<number>();
                    let dataLine:Array<number> = new Array<number>();
                    let month:Array<string> = new Array<string>();
                    for (let i = 0; i < reponse.length; i++) {
                        dataBar.push(reponse[i].total);
                        dataLine.push(reponse[i].total);
                        month.push(reponse[i].month);
                    }
                    dataBar.push(0);
                    this.loadGraph(month, dataBar, dataLine, reponse[0].monthYear.replace('   ', ' ') + " - " + reponse[reponse.length - 1].monthYear.replace('   ', ' '));
                    this.isErrorStartDate = false;
                    this.isErrorEndDate = false;
                }
            )
    }


    loadGraph(month:Array<string>, dataBar:Array<number>, dataLine:Array<number>, text:string):void {

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
        }

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
        }

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
        }
    }

    clear():void {
        this.showGraph = false;
        this.isErrorStartDate = false;
        this.isErrorEndDate = false;
        this.searchRequest = new SearchStatisticInforming();
    }
}

export class SearchStatisticInforming {
    startDate:string|Date;
    endDate:string|Date;
}
