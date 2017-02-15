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
var inform_message_1 = require("./inform_message");
var page_1 = require("../../shared/page");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
/**
 * Created by best on 19/10/2559.
 */
var InformMessageComponent = (function () {
    function InformMessageComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.informMessage = new inform_message_1.InformMessage();
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    InformMessageComponent.prototype.ngOnInit = function () {
        this.searchAction();
    };
    InformMessageComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        var params = new http_1.URLSearchParams();
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        params.set("sort", 'id,desc');
        this.http.get('/api/message-print-inform', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.pageData = data;
            console.log(data);
        });
    };
    InformMessageComponent.prototype.save = function () {
        var _this = this;
        this.http.post('/api/message-print-inform', this.informMessage).subscribe(function (data) {
            _this.toastr.success('บันทึกข้อมูลสำเร็จ');
            _this.searchAction();
            _this.clear();
        });
    };
    InformMessageComponent.prototype.clickUpdate = function (value) {
        this.informMessage = value;
    };
    InformMessageComponent.prototype.clickDelete = function (value) {
        this.deleteId = value.id + '';
        jQuery(this.confirmDelete.nativeElement).modal({ observeChanges: false }).modal({ closable: false }).modal('toggle');
    };
    InformMessageComponent.prototype.delete = function () {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('id', this.deleteId || null);
        this.http.delete('/api/message-print-inform', { search: params }).subscribe(function (data) {
            _this.toastr.info('ลบข้อมูลสำเร็จ');
            _this.searchAction();
        });
    };
    InformMessageComponent.prototype.clear = function () {
        this.informMessage = new inform_message_1.InformMessage();
    };
    __decorate([
        core_1.ViewChild('confirm_delete'), 
        __metadata('design:type', core_1.ElementRef)
    ], InformMessageComponent.prototype, "confirmDelete", void 0);
    InformMessageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'inform-message',
            templateUrl: 'inform_message.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], InformMessageComponent);
    return InformMessageComponent;
}());
exports.InformMessageComponent = InformMessageComponent;
//# sourceMappingURL=inform_message.component.js.map