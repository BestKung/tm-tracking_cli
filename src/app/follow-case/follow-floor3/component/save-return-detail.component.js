/**
 * Created by neng on 15/10/2559.
 */
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
var SaveReturnDetailComponent = (function () {
    function SaveReturnDetailComponent(http) {
        this.http = http;
        this.visible = true;
        this.completed = new core_1.EventEmitter();
    }
    SaveReturnDetailComponent.prototype.saveAction = function () {
        var _this = this;
        this.http.post('/api/return-request/3nd-save-return-detail', {
            agreementId: this.agreementId || null,
            invokeDate: this.invokedDate || null,
            returnedDate: this.returnedDate || null,
            returnedDueDate: jQuery(this.returnedDueDateValue.nativeElement).val() || null
        }).subscribe(function (resp) {
            console.log(resp);
            _this.completed.emit(_this.agreementId);
            jQuery(_this.saveReturnDetailModal.nativeElement).modal('hide');
        });
    };
    SaveReturnDetailComponent.prototype.showSaveReturnDetailModal = function () {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("agreementId", this.agreementId.toString());
        this.http.get('/api/absence-agreement/id/', { search: params }).map(function (resp) { return resp.json(); }).subscribe(function (result) {
            console.log(result);
            _this.agreementId = result.id;
            if (result.returnRequest) {
                _this.returnedDate = result.returnRequest.returnedDate;
                _this.returnedDueDate = result.returnRequest.returnedDueDate;
                _this.invokedDate = result.returnRequest.invokedDate;
            }
            else {
                var agreementId = result.id;
                _this.http.get("/api/return-request/get-by-agreementid/" + agreementId)
                    .filter(function (resp) { return resp.text() !== ''; })
                    .map(function (reps) { return reps.json(); })
                    .subscribe(function (reps) {
                    console.log("this is resp return request   ", reps);
                    if (reps != null) {
                        _this.returnedDate = reps.returnedDate;
                        _this.returnedDueDate = reps.returnedDueDate;
                        _this.invokedDate = reps.invokedDate;
                    }
                });
            }
            jQuery(_this.saveReturnDetailModal.nativeElement).modal('toggle');
        });
    };
    SaveReturnDetailComponent.prototype.changeReturnDueDate = function () {
        console.log(this.returnedDate);
        if (this.returnedDate) {
            this.returnedDueDate = this.returnedDate;
            this.returnedDueDate = new Date(this.returnedDueDate.toString());
            this.returnedDueDate.setDate(new Date(this.returnedDueDate.toString()).getDate() + SaveReturnDetailComponent.DATE_PLUS_15);
        }
    };
    SaveReturnDetailComponent.DATE_PLUS_15 = 15;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SaveReturnDetailComponent.prototype, "agreementId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], SaveReturnDetailComponent.prototype, "returnedDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SaveReturnDetailComponent.prototype, "invokedDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SaveReturnDetailComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SaveReturnDetailComponent.prototype, "completed", void 0);
    __decorate([
        core_1.ViewChild("save_return_detail_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], SaveReturnDetailComponent.prototype, "saveReturnDetailModal", void 0);
    __decorate([
        core_1.ViewChild("returnedDueDate_value"), 
        __metadata('design:type', core_1.ElementRef)
    ], SaveReturnDetailComponent.prototype, "returnedDueDateValue", void 0);
    SaveReturnDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'save-return-detail',
            templateUrl: 'save-return-detail.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SaveReturnDetailComponent);
    return SaveReturnDetailComponent;
}());
exports.SaveReturnDetailComponent = SaveReturnDetailComponent;
//# sourceMappingURL=save-return-detail.component.js.map