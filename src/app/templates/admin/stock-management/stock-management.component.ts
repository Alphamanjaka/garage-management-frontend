import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { Piece } from '../../../models/Piece';

@Component({
  selector: 'app-stock-management',
  imports: [FormsModule, NgFor, NgIf],
  standalone: true,
  templateUrl: './stock-management.component.html',
  styleUrl: './stock-management.component.scss'
})
export class StockManagementComponent {
  searchTerm: string = '';
  newPiece = { name: '', price: 0, ref: '' };
  showModal: boolean = false;
  pieces : Piece [] ;

  constructor(private stockService: StockService){
    this.pieces = [];
  }


  searchPiece() {
    this.stockService.searchPiece(this.searchTerm).subscribe(
      (response) => {
        if (response.length === 0 || this.searchTerm === '') {
        } else this.pieces = response;
      },
      (error) => { }
    );
  }

  addPiece() {
    this.stockService.addPiece(this.newPiece).subscribe(
      (response) => {
        this.newPiece =  new Piece();
      },
      (error) => { }
    );
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newPiece = { name: '', price: 0, ref: '' }; // Réinitialiser le formulaire
  }

  isFormValid(): boolean {
    return this.newPiece.name.trim() !== '' && 
           this.newPiece.price !== null && 
           this.newPiece.ref.trim() !== '';
  }
}
