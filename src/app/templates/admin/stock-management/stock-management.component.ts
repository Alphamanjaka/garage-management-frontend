import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-management',
  imports: [FormsModule, NgFor],
  templateUrl: './stock-management.component.html',
  styleUrl: './stock-management.component.scss'
})
export class StockManagementComponent {
  searchTerm: string = '';


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
}
