import {
    NgModule,
    Component,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    IterableDiffers
} from '@angular/core';
import {CommonModule} from '@angular/common';

declare var Chart: any;

@Component({
    selector: 'gt-chart',
    template: `
        <div>
            <canvas [attr.width]="width" [attr.height]="height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `
})
export class ChartComponent implements AfterViewInit, OnDestroy {

    @Input() type: string;

    private _data: any;

    @Input() set data(data: any) {
        this._data = data;
        this.refresh();
    }

    get data() {
        return this._data;
    }

    @Input() options: any;

    @Input() width: string;

    @Input() height: string;

    @Output() onDataSelect: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    chart: any;

    differ: any;

    constructor(public el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterViewInit() {
        this.initChart();
        this.initialized = true;
    }

    onCanvasClick(event) {
        if (this.chart) {
            let element = this.chart.getElementAtEvent(event);
            let dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({originalEvent: event, element: element[0], dataset: dataset});
            }
        }
    }

    initChart() {
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this._data,
            options: this.options
        });
    }

    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }

    getBase64Image() {
        return this.chart.toBase64Image();
    }

    refresh() {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }
}