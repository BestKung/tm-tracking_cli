import {Component, OnInit, OnDestroy} from "@angular/core";
import {FollowApprove} from "./follow_approve";
import {Page} from "../../shared/page";
import {FollowSearch} from "../../shared/follow_search";
import {PageEvent} from "../../shared/paging/page_event";
import {FollowApproveRestObjectService} from "../../shared/service/followapprove-rest-obj.service";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
/**
 * Created by best on 13/10/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'follow-approve-search',
    templateUrl: 'follow_approve_search.html'
})
export class FollowApproveSearchComponent implements OnInit, OnDestroy {

    pageData: Page<FollowApprove> = new Page<FollowApprove>();
    private currentPage: number = 0;
    private pageSize: number = 10;
    private subscription:Subscription;

    constructor(private followApprvRestObj: FollowApproveRestObjectService,
                private _route: Router) {
    }

    ngOnInit(): void {
        this.subscription = this._route.events.filter(event => event instanceof  NavigationEnd)
            .subscribe((val) => {

                if(this.followApprvRestObj.searchRequest.trNo
                    || this.followApprvRestObj.searchRequest.startDateStr
                    || this.followApprvRestObj.searchRequest.endDateStr
                    || this.followApprvRestObj.searchRequest.stepCode) {

                    if (val.url.startsWith("/follow/approve")) {
                        this.searchAction();
                    } else {
                        this.followApprvRestObj.clearParam();
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
        this.followApprvRestObj.searchFollowApprove(pageEvent)
            .subscribe(data => {
                this.pageData = data;
            })
    }

    private clear(): void {
        this.followApprvRestObj.searchRequest = new FollowSearch();
        this.followApprvRestObj.searchRequest.stepCode = '';
    }

}