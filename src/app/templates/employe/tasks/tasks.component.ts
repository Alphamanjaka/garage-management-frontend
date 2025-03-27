import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [RouterModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  isUnaffectedTaskActive: boolean;
  isCurrentTaskActive: boolean;
  isFinishedTaskActive: boolean;

  constructor(private router : Router){
    this.isUnaffectedTaskActive = true;
    this.isCurrentTaskActive =  false;
    this.isFinishedTaskActive = false;
  }

  openUnaffectedTask() {
    this.isUnaffectedTaskActive = true;
    this.isCurrentTaskActive =  false;
    this.isFinishedTaskActive = false;
    this.router.navigate(["/unaffected-task"]);

  }

  openCurrentTask() {
    this.isUnaffectedTaskActive = false;
    this.isCurrentTaskActive =  true;
    this.isFinishedTaskActive = false;
    this.router.navigate(["/current-task"]);
  }

  openFinishedTask() {
    this.isUnaffectedTaskActive = false;
    this.isCurrentTaskActive =  false;
    this.isFinishedTaskActive = true;
    this.router.navigate(["/finished-task"]);
  }
}
