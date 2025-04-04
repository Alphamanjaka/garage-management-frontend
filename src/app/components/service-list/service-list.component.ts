import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { log } from 'console';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { CarModel } from '../../models/CarModel';
import { Appointment } from '../../models/Appointment';
import { AppointmentService } from '../../services/appointment.service';
import { response } from 'express';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-service-list',
  imports: [CommonModule,FormsModule,ToastComponent],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
  providers: [DatePipe]
})

export class ServiceListComponent {
  services: any = [];
  searchTerm: string = "";
  selectedOptions: any[] = [];
  carModel : CarModel ;
  minDate: Date = new Date(); // Date du jour
  appointment : Appointment;

  constructor(
    private serviceService: ServiceService,
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
    private toastService: ToastService,
  ) {
    this.carModel = new CarModel();
    this.appointment = new Appointment();
  }

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

  takeAppointment(){
    let id = localStorage.getItem("identifiant") ?? '';

    if(id !== "" && id !== undefined && id !== null){
      this.appointment.clientID = id;
    }
    
    this.appointment.carInfo = this.carModel ;
    this.appointment.serviceList = this.selectedOptions ;

    console.log(this.appointment);
    const appointmt = {
      "clientID": id,
      "serviceList": this.appointment.serviceList,
      "expectedDate": this.appointment.expectedDate,
      "carInfo": this.carModel
    }
    
    this.appointmentService.addAppointment(appointmt)
    .subscribe(
      (response) => {
        this.showToast("", "Demande effectuée");
        this.services = [];
        this.selectedOptions = [];
        this.searchTerm = "";
      },
      (error)=>{
        console.error(error)
      },
    )
  }

  showToast(title: string, message: string) {
    this.toastService.success(title, message);
  }

  isFormValid(): boolean {
    return this.carModel.model.trim() !== '' &&
      this.carModel.model !== null &&
      this.carModel.mark !== null &&
      this.carModel.mark.trim() !== '' &&
      this.appointment.expectedDate !== null &&
      this.appointment.expectedDate.trim() !== "";
  }


}
