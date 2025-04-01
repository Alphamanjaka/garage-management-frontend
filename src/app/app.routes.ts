import { Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TemplateEmployeComponent } from './templates/employe/template-employe.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { TemplateClientComponent } from './templates/client/template-client.component';
import { DashboardComponent } from './templates/admin/dashboard/dashboard.component';
import { TemplateAdminComponent } from './templates/admin/template-admin.component';
import { EmployeManagementComponent } from './templates/admin/employe-management/employe-management.component';
import { StockManagementComponent } from './templates/admin/stock-management/stock-management.component';
import { UnaffectedTaskComponent } from './templates/employe/tasks/unaffected-task/unaffected-task.component';
import { CurrentTaskComponent } from './templates/employe/tasks/current-task/current-task.component';
import { FinishedTaskComponent } from './templates/employe/tasks/finished-task/finished-task.component';
import { TasksComponent } from './templates/employe/tasks/tasks.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'offers', component: OfferListComponent },
    { path: 'login/:role', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'unaffected-task', component: UnaffectedTaskComponent },
    // { path: 'current-task', component: CurrentTaskComponent },
    // { path: 'finished-task', component: FinishedTaskComponent },
    {
        path: 'client', component: TemplateClientComponent,
        children: [
            {
                path: '', component: OfferListComponent
            },
            {
                path: 'services', component: ServiceListComponent
            },
            {
                path: 'offers', component: OfferListComponent
            }
        ],
    },
    {
        path: 'admin', component: TemplateAdminComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'employee-mgmt', component: EmployeManagementComponent },
            { path: 'stock-mgmt', component: StockManagementComponent },
            { path: 'dashboard', component: DashboardComponent }
        ],
    },
    {   
        path: 'employe', component: TemplateEmployeComponent,
        children: [
            {
                path: 'tasks', component: TasksComponent,
            },
            {
                path: '', component: TasksComponent,
            }
        ]
    }
];
