import { Zone } from "./Zone";
import { Role } from "../Card/Card";

class AirstripZone extends Zone{
    constructor(){
        super("Airstrip", 3, 
        Role.Airstrip);
    }
}

export { AirstripZone }