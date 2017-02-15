/**
 * Created by best on 15/10/2559.
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {AuthenService} from "../../authen/shared/authen.service";
import {User} from "../../authen/shared/User";
import {Page} from "../../shared/page";
import {FollowRenew} from "./follow_renew";
import {FollowSearch} from "../../shared/follow_search";
import {PageEvent} from "../../shared/paging/page_event";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {FollowRenewRestObjectService} from "../../shared/service/followrenew-rest-obj.service";
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'follow-renew-search',
    templateUrl: 'follow_renew_search.html'
})
export class FollowRenewSearchComponent implements OnInit, OnDestroy {

    private pageData: Page<FollowRenew> = new Page<FollowRenew>();
    private currentPage: number = 0;
    private pageSize: number = 10;
    private subscription:Subscription;

    constructor(private http: Http,
                private _route: Router,
                private followRenewRestObjService: FollowRenewRestObjectService) {

    }

    ngOnInit(): void {
        this.subscription = this._route.events.filter(event => event instanceof  NavigationEnd)
            .subscribe((val) => {
                if(this.followRenewRestObjService.search.trNo
                    || this.followRenewRestObjService.search.startDateStr
                    || this.followRenewRestObjService.search.endDateStr
                    || this.followRenewRestObjService.search.stepCode) {

                    if (val.url.startsWith("/follow/renew")) {
                        this.searchAction();
                    } else {
                        this.followRenewRestObjService.clearParam();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getFollowRenew(): void {
        let params = new URLSearchParams();
        this.http.get('/api/follow-renew', {search: params})
            .map(data=><Page<FollowRenew>>data.json())
            .subscribe(data=> {
                this.pageData = data;
            });
    }

    findStepDescByStepCode(stepCode: string): string {
        let stepDesc: string = '';
        if ('101' == stepCode) {
            stepDesc = 'ตรวจสอบเอกสารรับคำขอ';
        }
        else if ('202' == stepCode) {
            stepDesc = 'นายทะเบียนพิจารณา';
        }
        else if ('308' == stepCode) {
            stepDesc = 'ออกหนังสือสำคัญแสดงการจดทะเบียน';
        }
        return stepDesc;
    }

    private searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.followRenewRestObjService.searchFollowRenew(pageEvent).subscribe(resp => this.pageData = resp);

    }

    clear(): void {
        this.followRenewRestObjService.search = new FollowSearch();
        this.followRenewRestObjService.search.stepCode = '';
    }

}