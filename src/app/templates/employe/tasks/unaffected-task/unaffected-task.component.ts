import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../../services/appointment.service';
import { log } from 'console';
import { Service } from '../../../../models/Service';
import { Appointment } from '../../../../models/Appointment';
import { ToastService } from '../../../../services/toast.service';
import { ToastComponent } from "../../../../shared/toast/toast.component";

@Component({
  selector: 'app-unaffected-task',
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './unaffected-task.component.html',
  styleUrl: './unaffected-task.component.scss'
})
export class UnaffectedTaskComponent {


  tasks: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  totalPages = 0;
  isLoading = false;
  errorMessage = '';

  taskToAssign: Appointment;
  minBeginningDate = new Date();
  esteemedFinishingDate =  "";
  beginningDate = "";

  constructor(private appointmentService : AppointmentService, private toastService: ToastService,){
    this.taskToAssign = new Appointment();
  }

  ngOnInit(): void{
    this.getPaginatedUnassignedTask();
  }

  refresh() {
    this.getPaginatedUnassignedTask();
  }

  getStatusLabel(arg0: any) {

  }
  isOverdue(arg0: any) {

  }
  getDueDateInfo(arg0: any) {

  }
  editTask(_t13: any) {

  }
  deleteTask(_t13: any) {

  }

  initModal(task: Appointment) {
    this.taskToAssign = task;
  }

  assignTask() {
    let idEmp = localStorage.getItem("identifiant") ?? '';
    this.taskToAssign.employeeId = idEmp;
    this.taskToAssign.serviceList.forEach(service => service.status = "En attente");
    this.appointmentService.updateAppointment(this.taskToAssign._id,this.taskToAssign)
    .subscribe(
      (response)=>{
        this.tasks = this.tasks.filter(item => item._id !== this.taskToAssign._id );
        this.taskToAssign = new Appointment() ;
        this.showSuccessToast()
      },
      (error)=>{}
    )
  }

  getPaginatedUnassignedTask(){
    this.isLoading = true;
    this.errorMessage = '';
    this.appointmentService.getPaginatedUnassignedTask(this.currentPage, this.itemsPerPage)
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
      this.getPaginatedUnassignedTask();
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getPaginatedUnassignedTask();
    }
  }

  showSuccessToast() {
    this.toastService.success("", "Tâche assignée à vous");
  }
}
