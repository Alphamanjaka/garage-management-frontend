export class Piece {
    _id: string;
    name: string;
    price: number;
    ref: string;
    constructor() {
        this._id= '';
        this.name='';
        this.price = 0;
        this.ref = '';
    }
}

export interface PieceAdded {
    piece: Piece;
    quantity: number;
  }