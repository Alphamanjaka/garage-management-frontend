import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from "../footer/footer.component";
import { BannerComponent } from "../banner/banner.component";
import { HeaderComponent } from "../header/header.component";
import { ServiceService } from '../../services/service.service';
@Component({
  selector: 'app-home',
  imports: [FooterComponent, BannerComponent, HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})


export class HomeComponent {
  searchQuery: any;
  servicesList: any;

  constructor(private serviceServices: ServiceService) { }

  ngOnInit() {
    this.fetchServices();
  }
  fetchServices() {
    this.serviceServices.getServices()
      .subscribe(data => this.servicesList = data.slice(0,4) );

  }

}
