import { Component, HostListener, signal } from '@angular/core';
import { LeftSidebarComponent } from '../../shared/left-sidebar/left-sidebar.component';
import { SidebareMenus } from '../../models/SidebareMenus';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-template-employe',
  imports: [RouterModule, CommonModule, LeftSidebarComponent],
  standalone: true,
  templateUrl: './template-employe.component.html',
  styleUrl: './template-employe.component.scss'
})
export class TemplateEmployeComponent {
  items: any;
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 1024); // Valeur par défaut en cas de SSR
  sidebarWidth = signal<string>('250px'); // Largeur normale

  constructor() {
    this.items = SidebareMenus.EMPLOYE;
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
