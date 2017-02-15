/**
 * Created by best on 12/12/2559.
 */
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {StopDuration} from "./stop_duration";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {Page} from "../../shared/page";
import {StopDurationK} from "./stop_duration_k";
@Component({
    moduleId: module.id,
    selector: 'stop-duration',
    templateUrl: 'stop_duration.html'
})
export class StopDurationComponent {

    trNo: number;

    today: Date|string;

    stopDuration: Page<StopDuration> = new Page<StopDuration>();

    stopDurationK: Page<StopDurationK> = new Page<StopDurationK>();

    public stepDesc = {
        '101': 'ตรวจสอบเอกสารรับคำขอ',
        '201': 'ตรวจสอบเครื่องหมาย',
        '202': 'นายทะเบียนพิจารณา',
        '301': 'จัดทำหนังสือประกาศโฆษณา',
        '304': 'ประกาศโฆษณา',
        '307': 'ออกหนังสือแจ้งให้ผู้ขอ ชำระค่าธรรมเนียมการจดทะเบียน',
        '308': 'ออกหนังสือสำคัญแสดงการจดทะเบียน'
    };

    constructor(public http: Http) {
    }

    searchAction(): void {
        let params = new DateSupportURLSearchParams();
        console.log('------' + this.today);
        params.set('trNo', this.trNo);
        params.set('today', this.today);
        this.http.get('/api/stop-doration-trademark', {search: params})
            .map(data => data.json() as Page<StopDuration>)
            .subscribe(data => {
                this.stopDuration = data;
                for (let i: number = 0; i < this.stopDuration.content.length; i++) {
                    if (!this.stopDuration.content[i].restDurationForAct) {
                        this.stopDuration.content[i].restDurationForAct = this.stopDuration.content[i].followTrademark.restDurationForAct;
                        this.stopDuration.content[i].stopDuration = this.stopDuration.content[i].followTrademark.stopDuration;
                        this.stopDuration.content[i].restDurationForStep = this.stopDuration.content[i].followTrademark.restDurationForStep;
                        this.stopDuration.content[i].restDorationPercenForAct = this.stopDuration.content[i].followTrademark.restDorationPercenForAct;
                        this.stopDuration.content[i].restDurationPercenForStep = this.stopDuration.content[i].followTrademark.restDorationPercenForStep;
                        this.stopDuration.content[i].overDuration = this.stopDuration.content[i].followTrademark.overDuration;
                    }
                }

            });
        this.http.get("/api/stop-doration-trademark/stop-duration-k", {search: params})
            .map(data => data.json() as Page<StopDurationK>)
            .subscribe(data => this.stopDurationK = data);
    }


    clickStartDuration(duration: StopDurationK): void {
        this.http.post('/api/stop-doration-trademark/start-duration', duration).subscribe(data => {
            let params = new DateSupportURLSearchParams();
            params.set('trNo', this.trNo);
            this.http.get("/api/stop-doration-trademark/stop-duration-k", {search: params})
                .map(data => data.json() as Page<StopDurationK>)
                .subscribe(data => this.stopDurationK = data);
        });
    }

}