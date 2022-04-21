import { Zone } from "./Zone";
import { Role } from "../Card/Card";

class SortingZone extends Zone{
    constructor(){
        super("Sorting", 7,
        Role.Sorter,
        Role.Airstrip,
        Role.Janitor);
    }
}

export { SortingZone }