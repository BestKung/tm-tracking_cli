/**
 * Created by pramoth on 10/2/2016 AD.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {EvidenceModel} from "../../model/evidence-model";
import {FormTypeModel} from "../../model/form-type-model";
@Component({
    moduleId: module.id,
    selector: 'evidence-tree',
    templateUrl: 'evidence_tree.html'
})
export class EvidenceTreeComponent {
    @Input() evidences: EvidenceModel[];

    @Output() completed: EventEmitter<string> = new EventEmitter<string>();

    public setDeleteStatus(event: any) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ", event);
        this.completed.emit(event);
    }
}
