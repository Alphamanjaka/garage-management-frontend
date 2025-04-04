import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../../models/Appointment';
import { Service } from '../../models/Service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { response } from 'express';
import { Piece, PieceAdded } from '../../models/Piece';
import { AppointmentService } from '../../services/appointment.service';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-form-adding-piece',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,ToastComponent ],
  templateUrl: './form-adding-piece.component.html',
  styleUrl: './form-adding-piece.component.scss'
})
export class FormAddingPieceComponent implements OnInit {
  @Input()
  appointmentReceived!: Appointment;
  @Input()
  serviceReceived!: Service;

  pieceForm: FormGroup;
  allPieces: Piece[] = [];
  selectedOption: string ="";

  constructor(
    private fb: FormBuilder,
    private pieceService: StockService, 
    private appointmentService : AppointmentService,
    private toastService: ToastService,
  ) {
    this.pieceForm = this.fb.group({
      pieceId: ['', Validators.required],
      pieceQtt: ['']
    });
  }

  ngOnInit(): void {
    this.selectedOption = this.serviceReceived.status;
    this.getAllPieces();
  }

  getAllPieces() {
    this.pieceService.getPieces().subscribe({
      next: (response) => {
        console.log("Pièces reçues:", response);
        this.allPieces = response;
        
        // Vérification dans le template
        setTimeout(() => {
          console.log("allPieces dans le template:", this.allPieces);
        });
      },
      error: (err) => console.error("Erreur de chargement:", err)
    });
  }

  addPiece(): void {
    if (this.pieceForm.valid) {
      const pieceAdded: PieceAdded = {
        piece: this.allPieces.find(piece => piece._id === this.pieceForm.get('pieceId')?.value)!,
        quantity: this.pieceForm.get('pieceQtt')?.value
      };
      this.serviceReceived.pieceList = [...this.serviceReceived.pieceList, pieceAdded];
      this.pieceForm.reset();
    }
    console.log("received",this.serviceReceived);
    
  }

  removePiece(pieceId: string): void {
   this.serviceReceived.pieceList = this.serviceReceived.pieceList.filter(
    item => item.piece._id !== pieceId
  );
  }

  saveModification() {
    this.updateServiceImmutable(this.serviceReceived);
    this.appointmentService.updateAppointment(this.appointmentReceived._id,this.appointmentReceived)
    .subscribe(
      {
        next: (response) => {
        console.log("Modification apportée:", response);
        this.showSuccessToast("","Mis à jour apporté")
        // Vérification dans le template
        setTimeout(() => {
          
        });
      },
      error: (err) => console.error("Erreur durant l'operation:", err)}
    )
    
  }
  
  updateServiceImmutable(updatedService: Service): void {
    this.appointmentReceived = {
      ...this.appointmentReceived,
      serviceList: this.appointmentReceived.serviceList.map(service => 
        service._id === updatedService._id ? {...updatedService} : service
      )
    };
  }

  showSuccessToast(title: string, message: string) {
    this.toastService.success(title, message);
  }

  updateServiceTask() {
    let idEmp = localStorage.getItem("identifiant") ?? '';
    this.appointmentReceived.employeeId = idEmp;
    const serviceIndex = this.appointmentReceived.serviceList.findIndex(s => s._id === this.serviceReceived._id);
    if (serviceIndex !== -1) {
      this.appointmentReceived.serviceList[serviceIndex].status = this.selectedOption; // Modification directe
    }
    
    this.appointmentService.updateAppointment(this.appointmentReceived._id,this.appointmentReceived)
    .subscribe(
      (response)=>{

        this.showSuccessToast("","Tâche en statut " + this.selectedOption);
        this.appointmentReceived = new Appointment() ;

      },
      (error)=>{}
    )
  }

  onClickOnService(task: Appointment,service : Service) {
  
  }

}

