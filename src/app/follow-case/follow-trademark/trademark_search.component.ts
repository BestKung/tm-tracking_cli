import {Component, OnInit, OnDestroy} from "@angular/core";
import {FollowTrademark} from "./follow_trademark";
import {Page} from "../../shared/page";
import {Category} from "../../shared/category";
import {FollowSearch} from "../../shared/follow_search";
import {UserService} from "../../authen/shared/user.service";
import {AuthenService} from "../../authen/shared/authen.service";
import {PageEvent} from "../../shared/paging/page_event";
import {FollowTrademarkRestObjectService} from "../../shared/service/followtm-rest-obj.service";
import {Router, NavigationEnd} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'trademark-search',
    templateUrl: './trademark_search.html',
    providers: [UserService, AuthenService]
})

export class TrademarkSearch implements OnInit,OnDestroy{
    private pageData: Page<FollowTrademark> = new Page<FollowTrademark>();
    private categoryOld: Category = new Category();
    private categoryA59: Category = new Category();
    private currentPage: number = 0;
    private pageSize: number = 10;
    private subscription:Subscription;

    constructor(private _followRestObj: FollowTrademarkRestObjectService,
                private _route: Router) {
    }

    ngOnInit(): void {
        this.subscription = this._route.events.filter(event => event instanceof  NavigationEnd)
            .subscribe((val) => {

                if(this._followRestObj.searchRequest.trNo
                    || this._followRestObj.searchRequest.startDateStr
                    || this._followRestObj.searchRequest.endDateStr
                    || this._followRestObj.searchRequest.stepCode) {

                    if (val.url.startsWith("/follow/trademark")) {
                        this.searchAction();
                    } else {
                        this._followRestObj.clearParam();
                    }
                }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    findDurationOfStepAndAct(requestDate: Date, stepCode: string, index: number): string {
        let dulationOfStep: string = '';
        if (requestDate >= this.categoryA59.act.actDate) {
            dulationOfStep = this.categoryA59.steps[index].totalDuration + ' ' + this.categoryA59.steps[index].durationType;
        }
        else {
            dulationOfStep = this.categoryOld.steps[index].totalDuration + ' ' + this.categoryOld.steps[index].durationType;
        }
        return dulationOfStep;
    }

    private searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        this.currentPage = pageEvent.currentPage - 1 ;
        this.pageSize = pageEvent.pageSize;
        this._followRestObj.searchFollowTrademark(pageEvent).subscribe(data=> {
            this.pageData = data;
        });
    }

    private clear(): void {
        this._followRestObj.searchRequest = new FollowSearch;
        this._followRestObj.searchRequest.stepCode = '';
    }
}

