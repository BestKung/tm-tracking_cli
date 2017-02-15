"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var page_1 = require("../../shared/page");
var email_message_1 = require("./email_message");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
/**
 * Created by best on 16/10/2559.
 */
var EmailMessageComponent = (function () {
    function EmailMessageComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.emailMessages = new page_1.Page();
        this.emailMessage = new email_message_1.EmailMessageConf();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    EmailMessageComponent.prototype.ngOnInit = function () {
        this.emailMessage = new email_message_1.EmailMessageConf();
        this.emailMessage.type = '';
        this.get();
    };
    EmailMessageComponent.prototype.clickMapText = function (value) {
        this.emailMessage.text = value;
    };
    EmailMessageComponent.prototype.save = function () {
        var _this = this;
        this.http.post('/api/email-message-setting', this.emailMessage).subscribe(function (data) {
            _this.toastr.success('บันทุกข้อมูลสำเร็จ');
            _this.get();
        });
    };
    EmailMessageComponent.prototype.get = function () {
        var _this = this;
        this.http.get('/api/email-message-setting')
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.emailMessages = data;
        });
    };
    EmailMessageComponent.prototype.edit = function (value) {
        this.emailMessage = value;
    };
    EmailMessageComponent.prototype.clickDelete = function (value) {
        this.deleteId = value.id;
        jQuery(this.confirmDeleteModal.nativeElement).modal({ observeChanges: false }).modal({ closable: false }).modal('toggle');
        console.log(value.id);
    };
    EmailMessageComponent.prototype.delete = function () {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('id', this.deleteId + "" || null);
        this.http.delete('/api/email-message-setting', { search: params }).subscribe(function (data) {
            _this.toastr.info('ลบข้อมูลสำเร็จ');
            _this.get();
        });
    };
    ;
    EmailMessageComponent.prototype.clear = function () {
        this.emailMessage = new email_message_1.EmailMessageConf();
        this.emailMessage.type = '';
    };
    __decorate([
        core_1.ViewChild('confirm_delete'), 
        __metadata('design:type', core_1.ElementRef)
    ], EmailMessageComponent.prototype, "confirmDeleteModal", void 0);
    EmailMessageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'email-message',
            templateUrl: 'email_message.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], EmailMessageComponent);
    return EmailMessageComponent;
}());
exports.EmailMessageComponent = EmailMessageComponent;
//# sourceMappingURL=email_message.component.js.map