/**
 * Created by best on 3/10/2559.
 */
import {Component, Input, OnInit} from "@angular/core";
/**
 * Created by best on 3/10/2559.
 */
@Component({
    selector: 'tag-color-follow-trademanrk',
    template: `
               <div style="font-size: 10px" [ngClass]="color" *ngIf="showPopup&&position == 'right'" (click)="myPopup.show($event, {position: 'right center'});">{{label}}</div>
               <div style="font-size: 10px" [ngClass]="color" *ngIf="!showPopup">{{label}}</div>
               <div style="font-size: 10px" [ngClass]="color" *ngIf="showPopup&&position == 'left'" (click)="myPopup.show($event, {position: 'left center'});">{{label}}</div>
               <sm-popup #myPopup>
               <div>
    <h4><font color="red"><u>{{stepDescription}}</u></font></h4>
    <span class="ui green label"></span><label>{{durationDescGreen}}</label><br/>
    <span class="ui yellow label"></span><label>{{durationDescYellow}}</label><br/>
    <span class="ui orange label"></span><label>{{durationDescOrange}}</label><br/>
    <span class="ui red label"></span><label>แแถบสีเแดง = เกินกำหนดระยะเวลาดำเนินการ</label>
</div>
               </sm-popup>
             `
})
export class TagColoeFollowTrademarkComponent implements OnInit {

    @Input()
    label: string;

    @Input()
    percenGreen: number;

    @Input()
    percenYellow: number;

    @Input()
    percentOrange: number;

    @Input()
    restPercenDuration: number;

    @Input()
    stepDescription: string = 'หมายเหตุ';

    @Input()
    durationType: string = 'วัน';

    @Input()
    durationGreen: number;

    @Input()
    durationYellow: number;

    @Input()
    durationOrange: number;

    @Input()
    position: string = 'right';

    color: string[];

    durationDescGreen: string = '';

    durationDescYellow: string = '';

    durationDescOrange: string = '';

    showPopup: boolean = false;


    ngOnInit(): void {
        this.checkColorForShowDurationStep();
        if (this.durationGreen && this.durationYellow && this.durationOrange) {
            this.checkDuration();
            this.checkPosition();
            this.showPopup = true;
        }
    }

    checkColorForShowDurationStep(): void {
        if (this.restPercenDuration > this.percenYellow) {
            this.color = ['ui', 'tag', 'label', 'green'];
        }
        if (this.restPercenDuration > this.percentOrange && this.restPercenDuration <= this.percenYellow) {
            this.color = ['ui', 'tag', 'label', 'yellow'];
        }
        if (this.restPercenDuration > 0 && this.restPercenDuration <= this.percentOrange) {
            this.color = ['ui', 'tag', 'label', 'orange'];
        }
        if (this.restPercenDuration <= 0) {
            this.color = ['ui', 'tag', 'label', 'red'];
        }
    }

    checkDuration(): void {
        let yellow: number;
        let orange: number;
        this.durationDescOrange = 'แถบสีส้ม = เหลือระยะเวลา 1 - ' + this.durationOrange + ' ' + this.durationType;
        this.durationDescGreen = 'แถบเขียว = เหลือระยะเวลา' + (this.durationYellow + 1) + ' - ' + this.durationGreen + ' ' + this.durationType;
        this.durationDescYellow = 'แถบสีเหลือง = เหลือระยะเวลา' + (this.durationOrange + 1) + ' - ' + this.durationYellow + ' ' + this.durationType;
        if ('เดือน' == this.durationType) {
            if (this.durationOrange <= 3) {
                orange = this.durationOrange * 30;
                let durationTypeLocal = 'วัน';
                this.durationDescYellow = 'แถบสีเหลือง = เหลือระยะเวลา' + (orange + 1) + ' วัน - ' + this.durationYellow + ' ' + this.durationType;
                this.durationDescOrange = 'แถบสีส้ม = เหลือระยะเวลา 1 - ' + orange + ' ' + durationTypeLocal;
            }
            if (this.durationYellow <= 3) {
                yellow = this.durationYellow * 30;
                let durationTypeLocal = 'วัน';
                this.durationDescYellow = 'แถบสีเหลือง = เหลือระยะเวลา' + (orange + 1) + ' - ' + yellow + ' ' + durationTypeLocal;
                this.durationDescGreen = 'แถบเขียว = เหลือระยะเวลา' + (yellow + 1) + ' วัน - ' + this.durationGreen + ' ' + this.durationType;
            }
        }
    }

    checkPosition(): void {
        if (this.position != 'left') {
            this.position = 'right';
        }
    }
}


