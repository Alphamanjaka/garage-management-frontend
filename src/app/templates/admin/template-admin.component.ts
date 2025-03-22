import { CommonModule } from '@angular/common';
import { Component, HostListener, input, output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeftSidebarComponent } from '../../shared/left-sidebar/left-sidebar.component';
import { SidebareMenus } from '../../models/SidebareMenus';

@Component({
  selector: 'app-template-admin',
  imports: [RouterModule, CommonModule, LeftSidebarComponent],
  templateUrl: './template-admin.component.html',
  styleUrl: './template-admin.component.scss'
})
export class TemplateAdminComponent {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 1024); // Valeur par défaut en cas de SSR
  sidebarWidth = signal<string>('250px'); // Largeur normale
  items: any ;

  constructor(){
    this.items = SidebareMenus.ADMIN;
  }
  
  @HostListener('window:resize', [])
  onResize() {
    if (typeof window !== 'undefined') {
      this.screenWidth.set(window.innerWidth);
      if (this.screenWidth() < 768) {
        this.isLeftSidebarCollapsed.set(true);
      }
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
    }
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
