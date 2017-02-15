/**
 * Created by neng on 3/10/2559.
 */
import { Component, Input } from "@angular/core";
import { EvidenceModel } from "../../model/evidence-model";
import { FormTypeModel } from "../../model/form-type-model";
@Component({
    moduleId: module.id,
    selector: 'checklist-table',
    templateUrl: 'checklist_table.html'
})

export class CheckListTableComponent {

    @Input() evidences: EvidenceModel[];
    @Input() formType: FormTypeModel;
}