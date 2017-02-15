/**
 * Created by best on 8/9/2559.
 */
import {Component, ViewChild, ElementRef} from "@angular/core";
import {SearchServiceAndExamineStatistic} from "../services-and-examine/search_services_and_examine_statistics_component";
import {URLSearchParams, Http} from "@angular/http";
declare var jQuery:any;
@Component({
    moduleId: module.id,
    selector: 'statistics-verify_request',
    templateUrl: 'statistics_verify_request.html'
})

export class StatisticsVerifyRequestComponent {

    private search:SearchServiceAndExamineStatistic = new SearchServiceAndExamineStatistic();
    private graphData:GraphData2[] = [];
    private textLabel:string[]=[];
    private labelMap:{[id:string]: string}[] = [];
    private valueMapper: {[id:string]: {[id:string]: number}[]}[] = [];

    constructor(private _http:Http) {
    }

    ngOnInit():void {
    }

    private searchAction() {
        let params = new URLSearchParams();
        params.set('createDateFrom', (this.search.createDateFrom == undefined ? null : this.search.createDateFrom + "") || null);
        params.set('createDateTo', (this.search.createDateTo == undefined ? null : this.search.createDateTo + "") || null);
        this._http.get('/api/service-examine/stat2', {search: params}).map(resp => resp.json()).subscribe(resp => {
            this.valueMapper = resp;
            this.graphData = resp;
            this.prepareDataToGraph(this.graphData);
            console.log(resp);
        });
    }

    private prepareDataToGraph(graphData: GraphData2[]) {
        this.labelMap = [];
        for(let itm of graphData) {
            if(this.labelMap.length == 0) {
                this.labelMap.push({[itm.month]: itm.month});
            } else {
                for(let lb of this.labelMap) {
                    if(!(itm.month in lb)) {
                        this.labelMap.push({[itm.month]: itm.month});
                    }
                }
            }
        }
        this.extractLabel();
        this.extractValue();
    }

    private extractLabel() {
        console.log('label ', this.labelMap);
        this.textLabel = [];
        for(let itm of this.labelMap) {
            for(let key in itm) {
                if(this.textLabel.length == 0) {
                    this.textLabel.push(itm[key]);
                }
                for(let lb of this.textLabel) {
                    if(lb === itm[key]) {
                        break;
                    } else {
                        this.textLabel.push(itm[key]);
                    }
                }
            }
        }
    }

    private extractValue() {
        this.valueMapper = [];
        for(let itm of this.textLabel) {
            let data: {[id:string]: {[id:string]: number}[]} = {[itm]: [{['CREATE_DATE']: 0}, {['INVOKED_DATE']: 0}, {['BOOK_DATE']: 0}]};
            this.valueMapper.push(data);
        }
        console.log('draft value = ', this.valueMapper);

        for(let itm of this.graphData) {
            for(let draft of this.valueMapper) {
                console.log(itm);
                console.log(draft[itm.month]);
                for(let data of draft[itm.month]) {
                    if(data.hasOwnProperty(itm.type)) {
                        data[itm.type] = itm.count;
                    }
                }
            }
        }

        console.log('current value = ', this.valueMapper);
    }

    private clear():void {
        this.search = new SearchServiceAndExamineStatistic();
    }
}

export class StatisticValue {

    org:string;
    formType:string;
    createdCount:number;
    bookCount:number;
    invokeCount:number;

}

export class GraphData {

    reportType:[{[id:string]:[{[id:string]:number[]}, {[id:string]:number[]}]}];
}

export class GraphData2 {

    count: number;
    month: string;
    type: string;
}