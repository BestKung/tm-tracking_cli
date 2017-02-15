/**
 * Created by pramoth on 10/31/2016 AD.
 */
import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, EventEmitter, Output, Input} from "@angular/core";
import {LocationAutocompleteService} from "./service/location-autocomplete.service";
import {Observable, Operator} from 'rxjs';
import {CtltLocation} from "../model/ctltlocation-model";
@Component({
    moduleId: module.id,
    selector: 'tumbon',
    templateUrl: 'tumbon.html'
})
export class TumbonComponent implements OnInit,AfterViewInit {

    @ViewChild("tumbon_text") tumbonText: ElementRef;
    private tombonResult:CtltLocation;

    @Output()
    private selected: EventEmitter<CtltLocation> =new EventEmitter();

    @Input()
    private dataInputTumbon:string = '';

    private popupStyle:string;
    constructor(private locationService: LocationAutocompleteService) {

    }

    ngOnInit(): void {
    }

    ngAfterViewInit():void{
        Observable.fromEvent(this.tumbonText.nativeElement, 'keyup')
            .debounceTime(500)
            .subscribe(e=>{
                this.locationService.searchLocation(this.tumbonText.nativeElement.value).subscribe(e=>{
                    if(this.tumbonText.nativeElement.value.trim()===''){
                        this.tombonResult=null;
                        this.popupStyle=''
                    }else{
                        this.tombonResult=e;
                        this.popupStyle='display: block !important;';
                    }
                    console.log("tumbon search result ", this.tombonResult);
                });
            },null,null);
    }
    select(tumbon: CtltLocation):void{
        this.selected.emit(tumbon);
        this.tombonResult=null;
        this.popupStyle=''
        this.dataInputTumbon = tumbon.tumbonName;
    }
}
