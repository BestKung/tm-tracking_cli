import {Component, OnInit, OnDestroy} from "@angular/core";
import {AuthenService} from "./authen/shared/authen.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "./authen/shared/User";
import {Http} from "@angular/http";
import {HttpStatusBus} from "./shared/http_status_bus";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import * as moment from "moment";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.html'
})
export class AppComponent implements OnInit, OnDestroy {
    isAuthen: boolean = false;
    subscription: Subscription;
    user: User;
    username: string;
    private httpRequestCompleted: boolean = true;
    verifyDocument = ['administrator',
        'g_service',
        'it'];

    followCase = ['administrator',
        'g_finance',
        'g_service',
        'scan',
        'g_renew',
        'g_change',
        'g_public',
        'g_register',
        'g_oppose',
        'g_law',
        'people',
        'g_check',
        'g_file',
        'it',];

    followThirdFloor = ['administrator',
        'g_service',
        'it'];

    followChange = ['administrator',
        'g_change',
        'g_check',
        'g_renew',
        'it'];

    followTrademark = ['administrator',
        'g_public',
        'g_register',
        'g_oppose',
        'g_check',
        'g_law',
        'it',
        'g_file',
        'outsource'];

    followTranfer = ['administrator',
        'g_change',
        'g_renew',
        'it',
        'g_check'];

    followApprove = ['administrator',
        'g_change',
        'g_renew',
        'it'];

    followRenew = ['administrator',
        'g_renew',
        'it',
        'g-change'];

    followCancle = ['administrator',
        'g_change',
        'g_renew',
        'it',
        'g_check',
        // 'g_service',
        'g_file',
        'g_check'];

    inform = ['administrator',
        'g_file',
        'outsource',
        'scan',
        'it'];

    letterInform = ['administrator',
        'g_file',
        'outsource',
        'scan',
        'it',
        'g_service'];

    documents = ['administrator',
        'g_file',
        'outsource',
        'scan',
        'it',
        'g_service'];


    constructor(private router: Router,
                private authenService: AuthenService,
                private http: Http,
                private httpStatus: HttpStatusBus,
                private toastr: ToastsManager) {
        httpStatus.start.subscribe(v => {
            this.httpRequestCompleted = false;
            console.log(`start request http -> ${v}`)
        });
        httpStatus.completed.subscribe(v => {
            this.httpRequestCompleted = true;
            console.log(`completed http request ${v}`)
        });
        httpStatus.error.subscribe(v => {
            this.httpRequestCompleted = true;
            if (v.json().type == 'validation') {
                this.toastr.warning('กรอกข้อมูลให้ครบถ้วน');
            }
            console.log('------------->' + JSON.stringify(v.json()));
            console.log(`error ${v}`)
        });
        //Overide default date format
        Date.prototype.toISOString = function () {
            return moment(this).format('YYYY-MM-DD');
        };
        Date.prototype.toString = function () {
            return moment(this).format('YYYY-MM-DD');
        };
        moment().locale("th")
    }

    checkManageStatus(): boolean {
        if (this.user.userId == 'khachaphorn.n') {
            return true;
        }
        for (let i = 0; i < this.user.authorities.length; i++) {
            if (this.user.authorities[i] == 'administrator') {
                return true;
            }
        }
        return false;
    }

    ngOnInit(): void {

        console.log(`authenticarion: ,`, this.authenService.isAuthen());
        console.log('current user login ,', localStorage['user']);
        this.subscription = this.authenService.isAuthen().subscribe(isAuthen => this.isAuthen = isAuthen);
        this.authenService.getUser().subscribe(user => {
            this.user = user;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    logout() {
        this.authenService.logout();
        this.router.navigate(['/home']);
    }


}
