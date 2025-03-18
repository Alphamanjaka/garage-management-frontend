import { Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TemplateEmployeComponent } from './templates/employe/template-employe.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { TemplateClientComponent } from './templates/client/template-client.component';
import { TemplateAdminComponent } from './templates/admin/template-admin.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'offers', component: OfferListComponent },
    { path: 'login/:role', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
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
    { path: 'admin', component: TemplateAdminComponent, },
    { path: 'employe', component: TemplateEmployeComponent, }
];
