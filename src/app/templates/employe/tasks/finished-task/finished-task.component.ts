import { Component } from '@angular/core';
import { Appointment } from '../../../../models/Appointment';
import { Service } from '../../../../models/Service';
import { AppointmentService } from '../../../../services/appointment.service';
import { ToastService } from '../../../../services/toast.service';
import { ToastComponent } from '../../../../shared/toast/toast.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finished-task',
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './finished-task.component.html',
  styleUrl: './finished-task.component.scss'
})
export class FinishedTaskComponent {
  tasks: Appointment[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  totalPages = 0;
  isLoading = false;
  errorMessage = '';
  taskToUpdate: Appointment;
  serviceToUpdate: Service;
  selectedOption : string ="";


  constructor(private appointmentService :AppointmentService, private toastService: ToastService){
    this.taskToUpdate = new Appointment();
    this.serviceToUpdate = new Service();
  }

  ngOnInit(): void{
    this.getPaginatedFinishedTask();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getPaginatedFinishedTask(){
    this.isLoading = true;
    this.errorMessage = '';
    this.appointmentService.getPaginatedFinishedTask(this.currentPage, this.itemsPerPage)
    .subscribe({
      next: (response) => {
        this.tasks = response.items;
        this.totalItems = response.totalItems;        
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des données';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onItemsPerPageChange(event: any): void {
    const newLimit = Number(event.target.value);
    if (newLimit !== this.itemsPerPage) {
      this.itemsPerPage = newLimit;
      this.currentPage = 1; // Reset to first page
      this.getPaginatedFinishedTask();
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getPaginatedFinishedTask();
    }
  }

  showSuccessToast(status : string) {
    this.toastService.success("", "Tâche marquée comme " + status);
  }

  initModal() {
    
  }

  updateServiceTask() {
    let idEmp = localStorage.getItem("identifiant") ?? '';
    this.taskToUpdate.employeeId = idEmp;
    const serviceIndex = this.taskToUpdate.serviceList.findIndex(s => s._id === this.serviceToUpdate._id);
    if (serviceIndex !== -1) {
      this.taskToUpdate.serviceList[serviceIndex].status = this.selectedOption;
    }
    
    this.appointmentService.updateAppointment(this.taskToUpdate._id,this.taskToUpdate)
    .subscribe(
      (response)=>{
        this.tasks = this.tasks.filter(item => item._id !== this.taskToUpdate._id );
        this.showSuccessToast(this.selectedOption);
        this.taskToUpdate = new Appointment() ;
        this.getPaginatedFinishedTask();

      },
      (error)=>{}
    )
  }

  refresh() {
    this.getPaginatedFinishedTask();
  }

  sendNotification(){

  }
}
