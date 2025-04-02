import { CarModel } from "./CarModel";
import { Service } from "./Service";

export class Appointment {

    constructor(
        public _id: string = '',
        public clientID: string = '',
        public serviceList: Service[] = [],
        public expectedDate: string = "",
        public carInfo: CarModel = new CarModel(),
        public serviceStartedAt: string = "",
        public serviceExpectedEndAt: string = "",
        public employeeId: String = ""
    ) {
        
    }
}