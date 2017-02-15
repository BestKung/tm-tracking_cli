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
/**
 * Created by neng on 6/11/2559.
 */
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var contract_autocomplete_service_1 = require("./service/contract-autocomplete.service");
var ContractSearchComponent = (function () {
    function ContractSearchComponent(_contractService, elementRef) {
        this._contractService = _contractService;
        this.contractResult = [];
        this.selected = new core_1.EventEmitter();
        this.dataInputContract = '';
        this.elementRef = elementRef;
    }
    ContractSearchComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        rxjs_1.Observable.fromEvent(this.contractText.nativeElement, 'keyup')
            .debounceTime(500)
            .subscribe(function (e) {
            _this._contractService.searchContractName(_this.contractText.nativeElement.value).subscribe(function (e) {
                if (_this.contractText.nativeElement.value.trim() === '') {
                    _this.contractResult = null;
                    _this.popupStyle = '';
                }
                else {
                    console.log('contract result ', e);
                    _this.contractResult = e;
                    _this.popupStyle = 'display: block !important; ';
                }
                console.log("contract search result ", _this.contractResult);
            });
        }, null, null);
    };
    ContractSearchComponent.prototype.select = function (contract) {
        this.selected.emit(contract);
        this.contractResult = null;
        this.popupStyle = '';
        this.dataInputContract = contract.contractViewPk.contractName;
    };
    ContractSearchComponent.prototype.ngOnInit = function () {
        jQuery(this.elementRef.nativeElement).ready(function () {
            var results_transition = jQuery('.results.transition');
            results_transition.removeClass("visible");
            jQuery(".ui.main.container").on('click', function () {
                results_transition.removeClass("visible");
            });
            jQuery('body').on('click', function () {
                results_transition.removeClass("visible");
            });
        });
    };
    __decorate([
        core_1.ViewChild("contract_text"), 
        __metadata('design:type', core_1.ElementRef)
    ], ContractSearchComponent.prototype, "contractText", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ContractSearchComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ContractSearchComponent.prototype, "dataInputContract", void 0);
    ContractSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'contract-search',
            templateUrl: 'contract-search.html'
        }), 
        __metadata('design:paramtypes', [contract_autocomplete_service_1.ContractAutoCompleteService, core_1.ElementRef])
    ], ContractSearchComponent);
    return ContractSearchComponent;
}());
exports.ContractSearchComponent = ContractSearchComponent;
//# sourceMappingURL=contract-search.component.js.map