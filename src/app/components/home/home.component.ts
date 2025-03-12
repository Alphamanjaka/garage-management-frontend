import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ServiceListComponent } from "../service-list/service-list.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ServiceListComponent, ServiceListComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
 

export class HomeComponent {
  searchQuery : any;

}
