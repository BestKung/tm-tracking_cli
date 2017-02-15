/**
 * Created by best on 15/9/2559.
 */
import {Component} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {PopulationDuedate} from "./population_duedate";
import {Page} from "../../../shared/page";
import {Observable} from "rxjs/Rx";
import {PageEvent} from "../../../shared/paging/page_event";
import {ToastsManager, Toast} from "ng2-toastr/ng2-toastr";
@Component({
    moduleId: module.id,
    selector: 'nontification-population-duedate',
    templateUrl: 'population_duedate.html'
})
export class NontificationPopulationDuedate {
    dueDate:number;
    nontificationPopulationDuedate:PopulationDuedate = new PopulationDuedate();
    pageData:Page<PopulationDuedate> = new Page<PopulationDuedate>();
    private currentPage:number = 0;
    private pageSize:number = 10;

    constructor(private http:Http, public toastr:ToastsManager) {
        this.searchAction();
    }

    searchAction(pageEvent:PageEvent = {currentPage: 1, pageSize: 10}):void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        let nontificationConfObserv:Observable<Page<PopulationDuedate>>;
        let params = new URLSearchParams();
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        nontificationConfObserv = this.http.get('/api/administrator/nontification-population-duedate/get', {search: params}).map(data=><Page<PopulationDuedate>>data.json());
        nontificationConfObserv.subscribe(data=>this.pageData = data);
    }

    private save() {
        this.http.post('/api/administrator/nontification-population-duedate/save', this.nontificationPopulationDuedate)
            .subscribe(data=> {
                this.searchAction();
                this.toastr.success('บันทึกข้อมูลเสร็จสิ้น');
            });
    }
}
