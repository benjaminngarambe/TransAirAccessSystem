import { Zone } from "./Zone";
import { Role } from "../Card/Card";

class StorageZone extends Zone{
    constructor(){
        super("Storage", 3,
        Role.Sorter,
        Role.Janitor);
    }
}

export { StorageZone }