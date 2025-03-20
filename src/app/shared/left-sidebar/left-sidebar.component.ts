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
  // @Input() role: UserRole = 'ADMIN'; // Par défaut ADMIN

  // itemsMenu: SidebarMenu = UserMenu[this.role];
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  // ngOnChanges(): void {
  //   this.itemsMenu = UserMenu[this.role]; // Mettre à jour si le rôle change dynamiquement
  // }
}
