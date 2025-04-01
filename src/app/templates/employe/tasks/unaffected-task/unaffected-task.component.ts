import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../../services/appointment.service';
import { log } from 'console';

@Component({
  selector: 'app-unaffected-task',
  imports: [CommonModule, FormsModule],
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

  constructor(private appointmentService : AppointmentService){
    this.getPaginatedTask();
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

  getPaginatedTask(){
    this.isLoading = true;
    this.errorMessage = '';
    this.appointmentService.getPaginatedTask(this.currentPage, this.itemsPerPage)
    .subscribe({
      next: (response) => {
        this.tasks = response.items;
        this.totalItems = response.totalItems;
        console.log('tp',response);
        
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
      this.getPaginatedTask();
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getPaginatedTask();
    }
  }
}
