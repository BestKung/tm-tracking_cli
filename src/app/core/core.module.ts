import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RestObjectService} from "./rest_object.service";
import {AbsenceAgreementService} from "./absence-agreement.service";
/**
 * Created by neng on 11/12/2559.
 */
@NgModule({
    imports:      [ CommonModule ],
    providers:    [
        RestObjectService ,
        AbsenceAgreementService
    ]
})
export class CoreModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule
        }
    }
}