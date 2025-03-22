import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRole } from '../../models/UserRole';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchQuery: any;
  // userRole : string ="";
  // UserRole = UserRole;

  // constructor(){
  //   this.userRole = "";

  //   if (typeof window !== 'undefined' && window.localStorage) {
      
  //     let role = localStorage.getItem("role");

  //     if (role !== null && role !== "" && role !== undefined) {
  //       console.log("ss",role);
        
  //       this.userRole = role;
  //     }
  //   }
  // }

  toggleMore() {

  }
  makeAppointment() {

  }

}
