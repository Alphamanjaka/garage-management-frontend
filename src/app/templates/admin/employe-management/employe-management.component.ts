import { CommonModule } from '@angular/common';
import { Component, HostListener, input, output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeftSidebarComponent } from '../../../shared/left-sidebar/left-sidebar.component';
import { SidebareMenus } from '../../../models/SidebareMenus';

@Component({
  selector: 'app-employe-management',
  imports: [RouterModule, CommonModule],
  templateUrl: './employe-management.component.html',
  styleUrl: './employe-management.component.scss'
})
export class EmployeManagementComponent {

}
