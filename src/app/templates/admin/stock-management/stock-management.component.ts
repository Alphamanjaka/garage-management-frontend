import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-management',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './stock-management.component.html',
  styleUrl: './stock-management.component.scss'
})
export class StockManagementComponent {
  searchTerm: string = '';

  newPiece = { name: '', price: 0, ref: '' };
  showModal: boolean = false;

  pieces = [
    { name: 'Vis M8', price: 2.5, ref: 'VIS-M8' },
    { name: 'Ecrou M10', price: 3.0, ref: 'ECR-M10' },
    { name: 'Plaque acier', price: 12.0, ref: 'PLQ-ACIER' },
    { name: 'Ressort', price: 5.5, ref: 'RESS-01' }
  ];

  get filteredPieces() {
    return this.pieces.filter(piece =>
      piece.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      piece.ref.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      piece.price.toString().includes(this.searchTerm)
    );
  }

  addPiece() {
    if (this.newPiece.name && this.newPiece.price > 0 && this.newPiece.ref) {
      this.pieces.push({ ...this.newPiece });
      this.newPiece = { name: '', price: 0, ref: '' };
    } else {
      alert('Veuillez remplir tous les champs avec des valeurs valides.');
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newPiece = { name: '', price: 0, ref: '' }; // Réinitialiser le formulaire
  }
}
