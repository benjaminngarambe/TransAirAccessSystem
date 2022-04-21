import { List } from "list-ts";
import { Card, Role } from "../Card/Card";

abstract class Zone{
    readonly name: string;
    capacity: number;
    allowedRoles: Array<Role> = [];
    readonly employees: List<Card> = new List<Card>();
    readonly adjacentZones: List<Zone> = new List<Zone>();


    constructor(name:string, capacity:number, ...allowedRoles: Array<Role>){
        this.name = name;
        this.capacity = capacity;
        if(allowedRoles){
            this.allowedRoles = allowedRoles;
        }
    }

    addEmployee(...employeeCards: Array<Card>){
        if(employeeCards.length == 0) { return; }

        for(let card of employeeCards){
            if(this.employees.count() >= this.capacity){
                break;
            }
            if(this.allowedRoles.includes(card.role)){
                this.employees.push(card);
            }else{
                console.log(`Employee ${card.toString()} is not allowed to enter ${this.name} zone`)
            }
        }
    }

    removeEmployee(...employeeCards: Array<Card>){
        if(employeeCards.length == 0) { return; }

        for(let card of employeeCards){
            this.employees.remove(card);
        }
    }

    removeEmployeeById(...ids: Array<number>){
        if(ids.length == 0) {return}

        for(let id of ids){
            this.employees.remove(this.employees.where(c => c.id == id).first());
        }
    }

    addAdjacentZone(...zones: Array<Zone>){
        if(zones.length == 0) { return; }

        for(let zone of zones){
            if(this.adjacentZones.contains(zone)) { continue; }
            this.adjacentZones.push(zone);
            zone.adjacentZones.push(this);
        }
    }

    removeAdjacentZone(...zones: Array<Zone>){
        if(zones.length == 0) { return; }

        for(let zone of zones){
            this.adjacentZones.remove(zone);
        }
    }

    hasSpace(){
        return this.employees.count() < this.capacity;
    }
}

export { Zone };
