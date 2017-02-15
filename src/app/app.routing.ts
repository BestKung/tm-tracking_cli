import {Routes, RouterModule, PreloadAllModules} from "@angular/router";
import {HomeComponent} from "./home/home.component";

export const appRoutes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'administrator', loadChildren: 'app/administrator/administrator.module#AdministratorModule'},
    // {path: 'verify-evidences', loadChildren: 'app/verify-evidence/verify_evidence.module#VerifyEvidenceModule'},
    {path: 'follow', loadChildren: 'app/follow-case/follow.module#FollowModule'},
    {path: 'print-informs', loadChildren: 'app/print-inform/print_inform.module#PrintInformModule'},
    {path: 'letter-informs', loadChildren: 'app/letter-inform/letter_inform.module#LetterInformModule'},
    {
        path: 'letter-acknowledgement',
        loadChildren: 'app/letter-acknowledgement/acknowledgement.module#AcknowledgementModule'
    },
    {path: 'reports', loadChildren: 'app/report/reports.module#ReportsModule'},
    {path: 'timer', loadChildren: 'app/timer/timer.module#TimerModule'},
    // {path: 'manage-status', component: ListManageStatusComponent}
];
export const routing = RouterModule.forRoot(appRoutes, {useHash: true,preloadingStrategy: PreloadAllModules});

