import { Piece, PieceAdded } from "./Piece";

export class Service {
    _id: string;
    name: string;
    categoryId: string;
    status: string;
    pieceList: PieceAdded[];
    constructor() {
        this._id = '';
        this.name = '';
        this.categoryId = '';
        this.status = '';
        this.pieceList = [];
    }
}