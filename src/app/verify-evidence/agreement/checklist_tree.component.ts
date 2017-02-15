/**
 * Created by neng on 3/10/2559.
 */
import {Component, OnInit, Input} from "@angular/core";
import {EvidenceModel} from "../../model/evidence-model";

@Component({
    moduleId: module.id,
    selector: 'checklist-tree',
    templateUrl: 'checklist_tree.html'
})

export class ChecklistTreeComponent implements OnInit {

    @Input()
    private evidences: EvidenceModel[];

    ngOnInit(): void {
    }

}