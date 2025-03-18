import { Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'offers', component: OfferListComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
