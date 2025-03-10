import { Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'offers', component: OfferListComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];  
