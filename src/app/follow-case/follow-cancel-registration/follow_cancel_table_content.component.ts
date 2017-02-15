import {Component, OnInit, OnDestroy} from "@angular/core";
import {Http} from "@angular/http";
import {Page} from "../../shared/page";
import {PageEvent} from "../../shared/paging/page_event";
import {FollowSearch} from "../../shared/follow_search";
import {FollowCancelRegisteration} from "./follow_cancel_registeration";
import {FollowCancelRestService} from "../../shared/service/followcancel-rest-obj.service";
import {Router, NavigationEnd} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'table-cancel-content',
    templateUrl: './follow_cancel_table_content.html'
})
export class FollowCancelTableContentComponent implements OnInit, OnDestroy {

    pageData: Page<FollowCancelRegisteration> = new Page<FollowCancelRegisteration>();
    searchRequest: FollowSearch = new FollowSearch();
    private subscription:Subscription;
    private currentPage: number = 0;
    private pageSize: number = 10;

    constructor(private _route: Router,
                private followCancelRestService: FollowCancelRestService) {
    }

    ngOnInit(): void {
        this.subscription = this._route.events.filter(event => event instanceof  NavigationEnd)
            .subscribe((val) => {
                if(this.followCancelRestService.searchRequest.trNo
                    || this.followCancelRestService.searchRequest.startDateStr
                    || this.followCancelRestService.searchRequest.endDateStr
                    || this.followCancelRestService.searchRequest.stepCode) {
                    if (val.url.startsWith("/follow/cancel-registration/search")) {
                        this.searchAction();
                    } else {
                        this.followCancelRestService.clearParam();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.followCancelRestService.searchFollowCancel(pageEvent).subscribe(data => {
            this.pageData = data;
        })
    }

    private clear(): void {
        this.followCancelRestService.searchRequest = new FollowSearch();
        this.followCancelRestService.searchRequest.stepCode = '';
    }
}