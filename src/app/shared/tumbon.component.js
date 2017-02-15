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
 * Created by pramoth on 10/31/2016 AD.
 */
var core_1 = require("@angular/core");
var location_autocomplete_service_1 = require("./service/location-autocomplete.service");
var rxjs_1 = require('rxjs');
var TumbonComponent = (function () {
    function TumbonComponent(locationService) {
        this.locationService = locationService;
        this.selected = new core_1.EventEmitter();
        this.dataInputTumbon = '';
    }
    TumbonComponent.prototype.ngOnInit = function () {
    };
    TumbonComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        rxjs_1.Observable.fromEvent(this.tumbonText.nativeElement, 'keyup')
            .debounceTime(500)
            .subscribe(function (e) {
            _this.locationService.searchLocation(_this.tumbonText.nativeElement.value).subscribe(function (e) {
                if (_this.tumbonText.nativeElement.value.trim() === '') {
                    _this.tombonResult = null;
                    _this.popupStyle = '';
                }
                else {
                    _this.tombonResult = e;
                    _this.popupStyle = 'display: block !important;';
                }
                console.log("tumbon search result ", _this.tombonResult);
            });
        }, null, null);
    };
    TumbonComponent.prototype.select = function (tumbon) {
        this.selected.emit(tumbon);
        this.tombonResult = null;
        this.popupStyle = '';
        this.dataInputTumbon = tumbon.tumbonName;
    };
    __decorate([
        core_1.ViewChild("tumbon_text"), 
        __metadata('design:type', core_1.ElementRef)
    ], TumbonComponent.prototype, "tumbonText", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TumbonComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TumbonComponent.prototype, "dataInputTumbon", void 0);
    TumbonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tumbon',
            templateUrl: 'tumbon.html'
        }), 
        __metadata('design:paramtypes', [location_autocomplete_service_1.LocationAutocompleteService])
    ], TumbonComponent);
    return TumbonComponent;
}());
exports.TumbonComponent = TumbonComponent;
//# sourceMappingURL=tumbon.component.js.map