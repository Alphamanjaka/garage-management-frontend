import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CurrentTaskComponent } from "./current-task/current-task.component";
import { UnaffectedTaskComponent } from './unaffected-task/unaffected-task.component';
import { FinishedTaskComponent } from './finished-task/finished-task.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [RouterModule,CommonModule, FormsModule, UnaffectedTaskComponent,CurrentTaskComponent, FinishedTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  isUnaffectedTaskActive: boolean;
  isCurrentTaskActive: boolean;
  isFinishedTaskActive: boolean;

  constructor(private router : Router){
    this.isCurrentTaskActive =  false;
    this.isFinishedTaskActive = false;
    this.isUnaffectedTaskActive = true;
  }

  openUnaffectedTask() {
    this.isCurrentTaskActive =  false;
    this.isFinishedTaskActive = false;
    this.isUnaffectedTaskActive = true;
  }

  openCurrentTask() {
    this.isUnaffectedTaskActive = false;
    this.isFinishedTaskActive = false;
    this.isCurrentTaskActive =  true;
  }

  openFinishedTask() {
    this.isUnaffectedTaskActive = false;
    this.isCurrentTaskActive =  false;
    this.isFinishedTaskActive = true;
  }
}
