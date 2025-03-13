import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { BannerComponent } from "../banner/banner.component";
import { OfferListComponent } from "../offer-list/offer-list.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, BannerComponent, OfferListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
