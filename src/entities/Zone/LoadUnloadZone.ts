import { Zone } from "./Zone";
import { Role } from "../Card/Card";

class LoadUnloadZone extends Zone{
    constructor(){
        super("Load/Unload", 5,
        Role.Manager,
        Role.Airstrip,
        Role.Sorter,
        Role.Transport,
        Role.Janitor);
    }
}

export { LoadUnloadZone }