import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { log } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {
  services: any = [];
  searchTerm: string = "";
  selectedOptions: any[] = [];
  
  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    // this.fetchServices();
  }

  search() {
    console.log(this.searchTerm);

    this.serviceService.searchService(this.searchTerm).subscribe(
      (response) => {
        if (response.length === 0 || this.searchTerm === '') {
          this.services = [];
          this.services = this.selectedOptions;
        } else {
          let aside = response.filter(item =>
            !this.selectedOptions.some(selected => selected._id === item._id)
          );
          this.services = [];
          this.services = [...this.selectedOptions, ...aside]
        }
      },
      (error) => { }
    );
  }

  fetchServices() {
    this.serviceService.getServices()
      .subscribe(data => this.services = data);
  }

  isRadioSelected(option: any): boolean {    
    return this.selectedOptions.some(item => item._id === option._id);
  }

  toggleSelection(option: any): void {
    if (this.isRadioSelected(option)) {
      this.selectedOptions = this.selectedOptions.filter(item => item._id !== option._id);
      
    } else {
      this.selectedOptions = [...this.selectedOptions, option];
      console.log("selected",this.selectedOptions);
      
    }
  }
}
