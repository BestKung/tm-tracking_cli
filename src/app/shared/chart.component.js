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
var core_1 = require('@angular/core');
var ChartComponent = (function () {
    function ChartComponent(el, differs) {
        this.el = el;
        this.onDataSelect = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    Object.defineProperty(ChartComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    ChartComponent.prototype.ngAfterViewInit = function () {
        this.initChart();
        this.initialized = true;
    };
    ChartComponent.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var element = this.chart.getElementAtEvent(event);
            var dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    };
    ChartComponent.prototype.initChart = function () {
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this._data,
            options: this.options
        });
    };
    ChartComponent.prototype.getCanvas = function () {
        return this.el.nativeElement.children[0].children[0];
    };
    ChartComponent.prototype.getBase64Image = function () {
        return this.chart.toBase64Image();
    };
    ChartComponent.prototype.refresh = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    };
    ChartComponent.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChartComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], ChartComponent.prototype, "data", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChartComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChartComponent.prototype, "height", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ChartComponent.prototype, "onDataSelect", void 0);
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'gt-chart',
            template: "\n        <div>\n            <canvas [attr.width]=\"width\" [attr.height]=\"height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map