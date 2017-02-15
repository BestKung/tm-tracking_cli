import {Component, OnInit, OnDestroy} from "@angular/core";
import {Page} from "../../shared/page";
import {FollowChange} from "./follow_change";
import {Http} from "@angular/http";
import {FollowSearch} from "../../shared/follow_search";
import {PageEvent} from "../../shared/paging/page_event";
import {FollowChangeRestObjectService} from "../../shared/service/followchange-rest-obj.service";
import {Subscription} from "rxjs";
import {Router, NavigationEnd} from "@angular/router";
import {InterceptHttp} from "../../shared/intercept_http";
/**
 * Created by best on 6/10/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'follow-search',
    templateUrl: './follow_change_search.html'
})
export class FollowChangeSearchComponent implements OnInit,OnDestroy {

    private pageData: Page<FollowChange> = new Page<FollowChange>();
    private currentPage:number = 0;
    private pageSize:number = 10;
    private subscription:Subscription;

    constructor(private http: InterceptHttp,
                private followChangeRestObj: FollowChangeRestObjectService,
                private _route: Router) {
    }

    ngOnInit(): void {


        this.subscription = this._route.events.filter(event => event instanceof  NavigationEnd)
            .subscribe((val) => {

                if(this.followChangeRestObj.searchRequest.trNo
                    || this.followChangeRestObj.searchRequest.startDateStr
                    || this.followChangeRestObj.searchRequest.endDateStr
                    || this.followChangeRestObj.searchRequest.stepCode) {

                    if (val.url.startsWith("/follow/change")) {
                        this.searchAction();
                    } else {
                        this.followChangeRestObj.clearParam();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }


    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.followChangeRestObj.searchFollowChange(pageEvent).subscribe(data=> {
            this.pageData = data;
        });
    }


    private clear(): void {
        this.followChangeRestObj.searchRequest = new FollowSearch();
        this.followChangeRestObj.searchRequest.stepCode = "";
    }

}