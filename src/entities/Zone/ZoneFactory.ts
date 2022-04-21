import { Role } from "../Card/Card";
import { AirstripZone } from "./AirstripZone";
import { LoadUnloadZone } from "./LoadUnloadZone";
import { OutsideZone } from "./OutsideZone";
import { SortingZone } from "./SortingZone";
import { StorageZone } from "./StorageZone";
import { Zone } from "./Zone";

class ZoneFactory{
    getAristripZone(... adjacentZones: Array<Zone>){
        let zone = new AirstripZone();
        zone.addAdjacentZone(...adjacentZones);
        return zone;
    }

    getSortingZone(... adjacentZones: Array<Zone>){
        let zone = new SortingZone();
        zone.addAdjacentZone(...adjacentZones);
        return zone;
    }

    getStorageZone(... adjacentZones: Array<Zone>){
        let zone = new StorageZone();
        zone.addAdjacentZone(...adjacentZones);
        return zone;
    }

    getLoadUnloadZone(... adjacentZones: Array<Zone>){
        let zone = new LoadUnloadZone();
        zone.addAdjacentZone(...adjacentZones);
        return zone;
    }

    getOutsideZone(... adjacentZones: Array<Zone>){
        let zone = new OutsideZone();
        zone.addAdjacentZone(...adjacentZones);
        return zone;
    }
}

export { ZoneFactory }