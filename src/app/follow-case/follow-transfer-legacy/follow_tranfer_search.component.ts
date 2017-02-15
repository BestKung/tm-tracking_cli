import {Component, OnInit, OnDestroy} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {FollowTranfer} from "./follow_tranfer";
import {Page} from "../../shared/page";
import {FollowSearch} from "../../shared/follow_search";
import {PageEvent} from "../../shared/paging/page_event";
import {FollowTransferRestObjectService} from "../../shared/service/followtransfer-rest-obj.service";
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
/**
 * Created by best on 7/10/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'follow-tranfer-search',
    templateUrl: 'follow_tranfer_search.html'
})
export class FollowTranferSearchComponent implements OnInit, OnDestroy {

    private pageData:Page<FollowTranfer> = new Page<FollowTranfer>();
    private currentPage:number = 0;
    private pageSize:number = 10;
    private subscription:Subscription;

    constructor(private followTransferRestObj: FollowTransferRestObjectService,
                private _route: Router) {
    }

    ngOnInit():void {
        this.subscription = this._route.events.filter(event => event instanceof  NavigationEnd)
            .subscribe((val) => {

                if(this.followTransferRestObj.searchRequest.trNo
                    || this.followTransferRestObj.searchRequest.startDateStr
                    || this.followTransferRestObj.searchRequest.endDateStr
                    || this.followTransferRestObj.searchRequest.stepCode) {

                    if (val.url.startsWith("/follow/transfer-legacy")) {
                        this.searchAction();
                    } else {
                        this.followTransferRestObj.clearParam();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private searchAction(pageEvent:PageEvent = {currentPage: 1, pageSize: 10}):void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.followTransferRestObj.searchTransferLegacy(pageEvent).subscribe(resp => {
            this.pageData = resp;
        });
    }

    clear():void {
        this.followTransferRestObj.searchRequest = new FollowSearch();
        this.followTransferRestObj.searchRequest.stepCode = '';
    }
}