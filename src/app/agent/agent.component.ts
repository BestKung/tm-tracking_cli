import {Component} from "@angular/core";
/**
 * Created by pramoth on 8/30/2016 AD.
 */
@Component({
    moduleId: module.id,
    selector: '',
    templateUrl: 'agent.html'
})
export class AgentComponent {
    active = true;

    close() {
        this.active = false;
    }
}
