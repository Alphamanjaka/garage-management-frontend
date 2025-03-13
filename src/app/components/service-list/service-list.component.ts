import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service-list',
  imports: [CommonModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent {
  services: any;
  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.fetchServices();
  }

  fetchServices() {
    this.serviceService.getServices()
      .subscribe(data => this.services = data);
  }
}
