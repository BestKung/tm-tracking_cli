/**
 * Created by best on 26/10/2559.
 */
import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Page} from "../../../shared/page";
import {Email} from "./email";
import {PageEvent} from "../../../shared/paging/page_event";
import {DateSupportURLSearchParams} from "../../../shared/date-support-url-search-params";
@Component({
    moduleId: module.id,
    selector: 'email-test',
    templateUrl: 'email.html'
})
export class EmailTestComponent implements OnInit {

    pageData: Page<Email> = new Page<Email>();
    private currentPage: number = 0;
    private pageSize: number = 10;

    constructor(private http: Http) {

    }

    ngOnInit(): void {
        this.searchAction();
    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        let params = new DateSupportURLSearchParams();
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/test-mail', {search: params})
            .map(data => data.json() as Page<Email>)
            .subscribe(data => this.pageData = data);
    }

    setMail(): void {
        this.http.get('/api/test-mail/set-mail')
            .subscribe(data => {
                this.searchAction();
            });
    }

    sendMail(): void {
        this.http.get('/api/test-mail/send-mail')
            .subscribe(data => {
                this.searchAction();
            });
    }

    save(email: Email): void {
        console.log(email);
        this.http.post('/api/test-mail', email).subscribe(data => {
            this.searchAction();
        })
    }

    message(email: Email): void {
        let params = new DateSupportURLSearchParams();
        params.set('id', email.id);
        this.http.get('/api/test-mail/message', {search: params}).subscribe(data => {
            this.searchAction();
        })
    }

}