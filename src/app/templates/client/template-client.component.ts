import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ServiceListComponent } from '../../components/service-list/service-list.component';

@Component({
  selector: 'app-template-client',
  imports: [FooterComponent, ServiceListComponent],
  templateUrl: './template-client.component.html',
  styleUrl: './template-client.component.scss'
})
export class TemplateClientComponent {
  searchQuery: any;
}
