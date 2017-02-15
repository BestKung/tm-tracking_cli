/**
 * Created by neng on 6/11/2559.
 */
import {Component, ElementRef, ViewChild, Output, EventEmitter, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ContractAutoCompleteService} from "./service/contract-autocomplete.service";
import {ContractView} from "../model/contract-view-model";
declare var jQuery:any;
@Component({
    moduleId: module.id,
    selector: 'contract-search',
    templateUrl: 'contract-search.html'
})
export class ContractSearchComponent implements OnInit{

    @ViewChild("contract_text") contractText: ElementRef;
    private contractResult: ContractView[] = [];

    @Output()
    private selected: EventEmitter<ContractView> =new EventEmitter();

    @Input()
    private dataInputContract:string = '';

    private popupStyle:string;
    private elementRef: ElementRef;
    constructor(private _contractService: ContractAutoCompleteService, elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngAfterViewInit():void{
        Observable.fromEvent(this.contractText.nativeElement, 'keyup')
            .debounceTime(500)
            .subscribe(e=>{
                this._contractService.searchContractName(this.contractText.nativeElement.value).subscribe(e=>{
                    if(this.contractText.nativeElement.value.trim()===''){
                        this.contractResult=null;
                        this.popupStyle=''
                    }else{
                        console.log('contract result ', e);
                        this.contractResult=e;
                        this.popupStyle='display: block !important; ';
                    }
                    console.log("contract search result ", this.contractResult);
                });
            },null,null);
    }

    private select(contract: ContractView):void{
        this.selected.emit(contract);
        this.contractResult=null;
        this.popupStyle='';
        this.dataInputContract = contract.contractViewPk.contractName;
    }

    ngOnInit() {
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
    }
}