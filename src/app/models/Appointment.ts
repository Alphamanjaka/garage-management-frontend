import { CarModel } from "./CarModel";
import { Service } from "./Service";

export class Appointment {

    constructor(
        public clientID: string = '',
        public serviceList: Service[] = [],
        public expectedDate: string = "",
        public carInfo: CarModel = new CarModel()
    ) {
        
    }
}