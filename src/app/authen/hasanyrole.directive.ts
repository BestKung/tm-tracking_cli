import {Directive, TemplateRef, ViewContainerRef, Input, OnDestroy} from "@angular/core";
import {AuthenService} from "./shared/authen.service";
import {Subscription} from "rxjs";
/**
 * Created by pramoth on 9/7/2016 AD.
 */
@Directive({
    selector: '[hasAnyRole]',

})
export class HasAnyRoleDirective implements OnDestroy {
    private hasRole: boolean;
    private roles: string[];
    private subscription:Subscription;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authenService: AuthenService) {
    }

    @Input("hasAnyRole") set hasAnyRole(_roles: string[]) {
        this.roles = _roles || [];
        this.subscription = this.authenService.getUser().subscribe(user => {
            this.hasRole = this.authenService.hasAnyRole(this.roles);
            if (this.hasRole) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
