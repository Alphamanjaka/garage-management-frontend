import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { BannerComponent } from "../banner/banner.component";
import { HeaderComponent } from "../header/header.component";
@Component({
  selector: 'app-home',
  imports: [FooterComponent, BannerComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})


export class HomeComponent {
  searchQuery : any;

}
