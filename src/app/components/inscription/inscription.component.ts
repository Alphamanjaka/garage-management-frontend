import { Component } from '@angular/core';
import { User } from '../../models/User';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InscriptionService } from '../../services/inscription.service';
import { UserRole } from '../../models/UserRole';

@Component({
  selector: 'app-inscription',
  imports: [NgIf, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  user : User ;
  secondePassword : string ='';
  loading: boolean = false;
  inscriptionError : boolean = false;
  errorMessage: string = "";
  

  constructor(private router: Router,private inscritpionService : InscriptionService){
    this.user = new User();
  }

  signIn() {  
    this.inscritpionService.signIn(this.user,UserRole.CLI)
    .subscribe(
      (response)=>{
        this.user = new User();
        this.router.navigate(['/login/'+UserRole.CLI.toLocaleLowerCase()]);
      },
      (error)=>{}
    )
  }

  home() {
    this.router.navigate(['']);
  }

  passwordDoNotMatch() : boolean{
    if((this.user.password !== null && this.user.password !== "" && this.user.password !== undefined ) &&
        (this.secondePassword !== null && this.secondePassword !== "" && this.secondePassword !== undefined) &&
        this.secondePassword !== this.user.password
    ){
      return true;
    }
    return false;
  }
}
