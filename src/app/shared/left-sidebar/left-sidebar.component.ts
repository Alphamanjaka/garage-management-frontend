import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarMenu } from '../../models/SidebareMenu';
import { SidebareMenus } from '../../models/SidebareMenus';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  itemsMenu = input.required<SidebarMenu[]>(); 

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
