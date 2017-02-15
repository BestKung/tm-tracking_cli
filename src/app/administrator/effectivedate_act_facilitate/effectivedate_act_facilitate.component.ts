/**
 * Created by best on 16/9/2559.
 */
import {Component} from "@angular/core";
import {Step} from "./step";
import {Http, URLSearchParams} from "@angular/http";
import {Act} from "../model/act";
import {Page} from "../../shared/page";
import {Observable} from "rxjs/Rx";
import {Category} from "../../shared/category";
import {CategoryForSave} from "./category_for_save";
import {CategoryAndStep} from "./category_and_steps";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
@Component({
    moduleId: module.id,
    selector: 'effectivedate-act-faccilitate',
    templateUrl: 'effectivedate_act_facilitate.html'
})
export class EffectivedateActFacilitateComponent {
    acts:Page<Act> = new Page<Act>();
    category:Category = new Category();
    steps:Array<Step> = new Array<Step>();
    categorys:Page<Category> = new Page<Category>();
    stepss:Page<Step> = new Page<Step>();
    act:Act = new Act();

    constructor(private http:Http, public toastr:ToastsManager) {
        this.getAct();
        this.category.act.actId = 'กรุณาเลือกพรบ';
        this.category.name = 'กรุณาเลือกคู่มือ'
    }

    getAct() {
        let actObserv:Observable<Page<Act>>;
        actObserv = this.http.get('/api/act/get').map(data=><Page<Act>>data.json());
        actObserv.subscribe(data=>this.acts = data);
    }

    save():void {
        for (let i = 0; i < this.acts.content.length; i++) {
            if (this.acts.content[i].actId = this.category.actId) {
                this.category.act = this.acts.content[i];
            }
        }
        let categoryAndSteps:CategoryAndStep = new CategoryAndStep();
        categoryAndSteps.categoryDto = this.category;
        categoryAndSteps.stepsDto = this.stepss.content;
        this.http.post('/api/category', categoryAndSteps).subscribe(data=>{
            this.toastr.success('บันทึกข้อมูลสำเร็จ');
        });
    }

    getCategoryByAct(value:string):void {
        this.category.name = 'กรุณาเลือกคู่มือ';
        this.category = new Category();
        this.categorys = new Page<Category>();
        this.stepss = new Page<Step>();
        this.findActById(value)
        console.log(value);
        let params = new URLSearchParams();
        params.set("actId", value || "");
        let categoryObserv:Observable<Page<Category>>;
        categoryObserv = this.http.get('/api/category/search-by-act', {search: params}).map(data=><Page<Category>>data.json());
        categoryObserv.subscribe(data=>this.categorys = data);

    }

    getStepByCategory(value):void {
        this.findCategoryById(value);
        let params = new URLSearchParams();
        params.set("categoryId", value.toString() || "");
        let stepObserv:Observable<Page<Step>>;
        stepObserv = this.http.get('/api/step/search-by-category', {search: params}).map(data=><Page<Step>>data.json());
        stepObserv.subscribe(data=>this.stepss = data);
    }

    findCategoryById(id):void {
        for (let i = 0; i < this.categorys.content.length; i++) {
            if (this.categorys.content[i].id == id) {
                console.log(this.categorys.content[i].name + '=======');
                this.category = this.categorys.content[i];
            }
        }
    }

    findActById(id):void {
        for (let i = 0; i < this.acts.content.length; i++) {
            if (this.acts.content[i].actId == id) {
                this.act = this.acts.content[i];
            }
        }
    }

    clear():void {
        this.category.name = 'กรุณาเลือกคู่มือ'
        this.category = new Category();
        this.categorys = new Page<Category>();
        this.stepss = new Page<Step>();
        this.act = new Act();
    }
}
