import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../../models/Appointment';
import { Service } from '../../models/Service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { response } from 'express';
import { Piece } from '../../models/Piece';

@Component({
  selector: 'app-form-adding-piece',
  imports: [CommonModule, FormsModule, ReactiveFormsModule ],
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

  constructor(private fb: FormBuilder, private pieceService: StockService) {
    this.pieceForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
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
    // if (this.pieceForm.valid) {
    //   const newPiece: Piece = {
    //     id: this.nextPieceId++,
    //     ...this.pieceForm.value
    //   };
      
    //   this.service.pieceList = [...this.service.pieceList, newPiece];
    //   this.pieceForm.reset();
    // }
  }

  removePiece(pieceId: string): void {
    // this.service.pieceList = this.service.pieceList.filter(p => p.id !== pieceId);
  }

  

}

// export interface Piece {
//   id: number;
//   nom: string;
//   description?: string;
// }