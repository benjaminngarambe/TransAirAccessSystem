import { Zone } from "./Zone";
import { Role } from "../Card/Card";

class OutsideZone extends Zone{
    constructor(){
        super("Outside", Number.MAX_SAFE_INTEGER,
        Role.Manager,
        Role.Airstrip,
        Role.Sorter,
        Role.Transport,
        Role.Janitor);
    }
}

export { OutsideZone }