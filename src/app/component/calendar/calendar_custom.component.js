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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var primeng_1 = require("primeng/primeng");
exports.CALENDAR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CalendarGtComponent; }),
    multi: true
};
var CalendarGtComponent = (function () {
    function CalendarGtComponent(el, zone) {
        this.el = el;
        this.zone = zone;
        this.inline = false;
        this.monthNavigator = true;
        this.yearNavigator = true;
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.hourMin = 0;
        this.hourMax = 23;
        this.minuteMin = 0;
        this.minuteMax = 59;
        this.secondMin = 0;
        this.secondMax = 59;
        this.hourGrid = 0;
        this.minuteGrid = 0;
        this.secondGrid = 0;
        this.icon = 'fa-calendar';
        this.yearRange = '1916:2100';
        this.onBlur = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
        this.initialized = false;
    }
    CalendarGtComponent.prototype.ngOnInit = function () {
        this.locale = {
            // monthNames: ["Januczscary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.	", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]
        };
    };
    CalendarGtComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.calendarElement = this.inline ? jQuery(this.el.nativeElement.children[0]) : jQuery(this.el.nativeElement.children[0].children[0]);
        var options = {
            showAnim: this.showAnim,
            dateFormat: this.dateFormat,
            showButtonPanel: this.showButtonPanel,
            changeMonth: this.monthNavigator,
            changeYear: this.yearNavigator,
            numberOfMonths: this.numberOfMonths,
            showWeek: this.showWeek,
            showOtherMonths: this.showOtherMonths,
            selectOtherMonths: this.selectOtherMonths,
            defaultDate: this.defaultDate,
            minDate: this.minDate,
            maxDate: this.maxDate,
            yearRange: this.yearRange,
            onSelect: function (dateText) {
                _this.zone.run(function () {
                    _this.value = dateText;
                    _this.onModelChange(_this.value);
                    _this.onSelect.emit(_this.value);
                });
            }
        };
        if (this.locale) {
            for (var prop in this.locale) {
                options[prop] = this.locale[prop];
            }
        }
        if (this.timeFormat || this.timeOnly) {
            options['timeFormat'] = this.timeFormat;
            options['timeOnly'] = this.timeOnly;
            options['stepHour'] = this.stepHour;
            options['stepMinute'] = this.stepMinute;
            options['stepSecond'] = this.stepSecond;
            options['hourMin'] = this.hourMin;
            options['hourMax'] = this.hourMax;
            options['minuteMin'] = this.minuteMin;
            options['minuteMax'] = this.minuteMax;
            options['secondMin'] = this.secondMin;
            options['secondMax'] = this.secondMax;
            options['hourGrid'] = this.hourGrid;
            options['minuteGrid'] = this.minuteGrid;
            options['secondGrid'] = this.secondGrid;
            options['controlType'] = this.timeControlType;
            options['oneLine'] = this.horizontalTimeControls;
            options['minTime'] = this.minTime;
            options['maxTime'] = this.maxTime;
            options['timezoneList'] = this.timezoneList;
            this.calendarElement.datetimepicker(options);
        }
        else
            this.calendarElement.datepicker(options);
        this.initialized = true;
    };
    CalendarGtComponent.prototype.onInput = function (event) {
        this.onModelChange(event.target.value);
    };
    CalendarGtComponent.prototype.handleBlur = function (event) {
        this.value = event.target.value;
        this.onModelTouched();
        this.focused = false;
        this.onBlur.emit(event);
    };
    CalendarGtComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    CalendarGtComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    CalendarGtComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    CalendarGtComponent.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.calendarElement.datepicker('option', key, changes[key].currentValue);
            }
        }
    };
    CalendarGtComponent.prototype.ngOnDestroy = function () {
        this.calendarElement.datepicker('destroy');
        this.calendarElement = null;
        this.initialized = false;
    };
    CalendarGtComponent.prototype.onButtonClick = function (event, input) {
        input.focus();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "readonlyInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarGtComponent.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarGtComponent.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "inline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "showAnim", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "dateFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "showButtonPanel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "monthNavigator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "yearNavigator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "numberOfMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "showWeek", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "showOtherMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "selectOtherMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarGtComponent.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarGtComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarGtComponent.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarGtComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "showIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "timeFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "timeOnly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "stepHour", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "stepMinute", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "stepSecond", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "hourMin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "hourMax", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "minuteMin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "minuteMax", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "secondMin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "secondMax", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "hourGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "minuteGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarGtComponent.prototype, "secondGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "timeControlType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarGtComponent.prototype, "horizontalTimeControls", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "minTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "maxTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CalendarGtComponent.prototype, "timezoneList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarGtComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarGtComponent.prototype, "yearRange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarGtComponent.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CalendarGtComponent.prototype, "onSelect", void 0);
    CalendarGtComponent = __decorate([
        core_1.Component({
            selector: 'p-calendar-gtxx',
            template: "\n        <span  [class]=\"styleClass\" *ngIf=\"!inline\">\n        <input #in type=\"text\" [attr.placeholder]=\"placeholder\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\"\n                [value]=\"value||''\" (input)=\"onInput($event)\" [readonly]=\"readonlyInput\"\n                [disabled]=\"disabled\" (mouseenter)=\"hovered=true\" (mouseleave)=\"hovered=false\" (focus)=\"focused=true\" (blur)=\"handleBlur($event)\"\n                [ngClass]=\"{'ui-inputtext ui-widget ui-state-default': true, 'ui-corner-all': !showIcon, 'ui-corner-left': showIcon,\n                    'ui-state-hover':hovered,'ui-state-focus':focused,'ui-state-disabled':disabled}\"\n        ><button type=\"button\" [icon]=\"icon\" pButton *ngIf=\"showIcon\" (click)=\"onButtonClick($event,in)\" \n                [ngClass]=\"{'ui-datepicker-trigger':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled\"></button>\n                </span>\n        <div *ngIf=\"inline\"></div>\n    ",
            providers: [exports.CALENDAR_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
    ], CalendarGtComponent);
    return CalendarGtComponent;
}());
exports.CalendarGtComponent = CalendarGtComponent;
var CalendarGTModule = (function () {
    function CalendarGTModule() {
    }
    CalendarGTModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, primeng_1.ButtonModule],
            exports: [CalendarGtComponent],
            declarations: [CalendarGtComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarGTModule);
    return CalendarGTModule;
}());
exports.CalendarGTModule = CalendarGTModule;
//# sourceMappingURL=calendar_custom.component.js.map