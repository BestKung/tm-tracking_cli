import { TemplateRef, ViewContainerRef, Directive, Input } from "@angular/core";
import { AuthenService } from "./shared/authen.service";
import { User } from "./shared/User";

@Directive({
    selector: '[isNotAuthen]'
})
export class IsNotAuthenDirective {

    constructor(private _templateRef: TemplateRef<any>, private _viewContainer: ViewContainerRef, private _authenService: AuthenService) {
    }

    @Input("isNotAuthen") set isNotAuthen(_user: User) {
        if (!_user) {
            this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainer.clear();
        }
    }
}