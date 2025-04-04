import { Component } from '@angular/core';
import { AppointmentService } from '../../../../services/appointment.service';
import { ToastService } from '../../../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../../../shared/toast/toast.component';
import { Appointment } from '../../../../models/Appointment';
import { Service } from '../../../../models/Service';
import { log } from 'console';
import { FormAddingPieceComponent } from "../../../../components/form-adding-piece/form-adding-piece.component";

@Component({
  selector: 'app-current-task',
  imports: [CommonModule, FormsModule, ToastComponent, FormAddingPieceComponent],
  templateUrl: './current-task.component.html',
  styleUrl: './current-task.component.scss'
})
export class CurrentTaskComponent {

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
  isAddingPiece : boolean = false;

  constructor(private appointmentService :AppointmentService, private toastService: ToastService){
    this.taskToUpdate = new Appointment();
    this.serviceToUpdate = new Service();
  }

  ngOnInit(): void{
    this.getPaginatedCurrentTask();
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

  showSuccessToast(status : string) {
    this.toastService.success("", "Tâche marquée comme " + status);
  }

  onClickOnService(task: Appointment,service : Service) {
    this.taskToUpdate = task;
    this.serviceToUpdate = service;
    this.selectedOption = this.serviceToUpdate.status;
    this.isAddingPiece = true;
  }

  updateServiceTask() {
    let idEmp = localStorage.getItem("identifiant") ?? '';
    this.taskToUpdate.employeeId = idEmp;
    const serviceIndex = this.taskToUpdate.serviceList.findIndex(s => s._id === this.serviceToUpdate._id);
    if (serviceIndex !== -1) {
      this.taskToUpdate.serviceList[serviceIndex].status = this.selectedOption; // Modification directe
    }
    
    this.appointmentService.updateAppointment(this.taskToUpdate._id,this.taskToUpdate)
    .subscribe(
      (response)=>{
        this.tasks = this.tasks.filter(item => item._id !== this.taskToUpdate._id );
        this.showSuccessToast(this.selectedOption);
        this.taskToUpdate = new Appointment() ;
        this.getPaginatedCurrentTask();

      },
      (error)=>{}
    )
  }

  refresh() {
    this.getPaginatedCurrentTask();
  }
}
