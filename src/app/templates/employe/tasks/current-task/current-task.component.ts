import { Component } from '@angular/core';
import { AppointmentService } from '../../../../services/appointment.service';
import { ToastService } from '../../../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../../../shared/toast/toast.component';
import { Appointment } from '../../../../models/Appointment';
import { Service } from '../../../../models/Service';

@Component({
  selector: 'app-current-task',
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './current-task.component.html',
  styleUrl: './current-task.component.scss'
})
export class CurrentTaskComponent {
  tasks: any[] = [];
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

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getPaginatedCurrentTask(){
    this.isLoading = true;
    this.errorMessage = '';
    this.appointmentService.getPaginatedCurrentTask(this.currentPage, this.itemsPerPage)
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
      this.getPaginatedCurrentTask();
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getPaginatedCurrentTask();
    }
  }

  showSuccessToast() {
    this.toastService.success("", "Tâche assignée à vous");
  }

  initModal(task: Appointment,service : Service) {
    this.taskToUpdate = task;
  }

  updateServiceTask() {
    let idEmp = localStorage.getItem("identifiant") ?? '';
    this.taskToUpdate.employeeId = idEmp;
    this.tasks = this.tasks.filter(item => item._id !== this.taskToUpdate._id );
    this.tasks.forEach(t =>{

    })
    for( let task of this.tasks){
      if(task._id === this.taskToUpdate._id){
        for(let service of task.serviceList){

        }
      }else{
        continue;
      }
    }

    this.appointmentService.updateAppointment(this.taskToUpdate._id,this.taskToUpdate)
    .subscribe(
      (response)=>{
        this.tasks = this.tasks.filter(item => item._id !== this.taskToUpdate._id );
        this.taskToUpdate = new Appointment() ;
        this.showSuccessToast()
      },
      (error)=>{}
    )
  }
}
