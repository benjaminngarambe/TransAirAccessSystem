import { List } from "list-ts";
import { Queue } from "queue-typescript"
import { Card, Role } from "./Card/Card";
import { CardFactory } from "./Card/CardFactory";
import { ManagerCard } from "./Card/ManagerCard";
import { AirstripCard } from "./Card/AirstripCard";
import { SorterCard } from "./Card/SorterCard";
import { TransportCard } from "./Card/TransportCard";
import { JanitorCard } from "./Card/JanitorCard";
import { Zone } from "./Zone/Zone"
import { ZoneFactory } from "./Zone/ZoneFactory";
import { OutsideZone } from "./Zone/OutsideZone";

class Centre{
    constructor(readonly id:number,readonly name:string) {}

    protected cardFactory: CardFactory = new CardFactory();
    readonly employees: List<Card> = new List<Card>();

    protected zoneFactory: ZoneFactory = new ZoneFactory();
    readonly defaultOutsideZone: OutsideZone = this.zoneFactory.getOutsideZone();
    readonly zones: List<Zone> = new List<Zone>([this.defaultOutsideZone]);

    
    get managers(): Array<ManagerCard>{
        return this.employees.where(a => a.role == Role.Manager).toArray() as ManagerCard[];
    }
    get airstrips(): Array<AirstripCard>{
        return this.employees.where(a => a.role == Role.Airstrip).toArray() as AirstripCard[];
    }
    get sorters(): Array<SorterCard>{
        return this.employees.where(a => a.role == Role.Sorter).toArray() as SorterCard[];
    }
    get transports(): Array<TransportCard>{
        return this.employees.where(a => a.role == Role.Transport).toArray() as TransportCard[];
    }
    get janitors(): Array<JanitorCard>{
        return this.employees.where(a => a.role == Role.Janitor).toArray() as JanitorCard[];
    }

    addCard( ...people : Array<{name: string, surname:string, role :Role}>){
        if(people.length == 0) { return; }
        
        for(let person of people){
            switch(person.role){
                case  Role.Manager:
                    this.addManagerCard(person.name, person.surname);
                    break;
                case Role.Airstrip:
                    this.addAirstripCard(person.name, person.surname);
                    break;
                case Role.Sorter:
                    this.addSorterCard(person.name, person.surname);
                    break;
                case Role.Transport:
                    this.addTransportCard(person.name, person.surname);
                    break;
                case Role.Janitor:
                    this.addJanitorCard(person.name, person.surname);
                    break;
            }
        }
    }

    deleteCard(id:number){
        this.zones.forEach(z => z.removeEmployeeById(id));
        this.employees.remove(this.employees.first(a=> a.id == id));
    }

    moveCard(card:Card, destination:Zone): void{
        if(!this.zones.contains(destination)){
            console.log(`${destination.name} zone does not exists in ${this.name} Centre`);
            return;
        }
        if(!this.employees.contains(card)){
            console.log(`${card.toString} is not employee of ${this.name} Centre`);
            return;
        }

        //BFS shortest path algorithm
        let startZone = this.findCardLocation(card);
        let bfsResult = this.BFS(startZone);
        let path = this.getPath(startZone, destination, bfsResult);

        let prevZone = startZone;
        for(let zone of path){
            if(zone == startZone) { continue; }
            if(!zone.hasSpace()){
                console.log(`There is no free space in ${zone.name} zone. ${card.toString()} is left in ${prevZone.name}`);
                return;
            }else if(!zone.allowedRoles.includes(card.role)){
                console.log(`${card.toString()} is not allowed to be in ${zone.name} zone. ${card.toString()} is left in ${prevZone.name} zone`);
                return;
            }else if(card.role == Role.Janitor &&       //specific requirement from documentation
                    !zone.employees.any(a => a.role != Role.Janitor)){
                console.log(`No employee who is not a Janitor is present in the ${zone.name} zone. ${card.toString()} is left in ${prevZone.name} zone`);
                return;
            }
            this.zones.forEach(a => a.removeEmployee(card));
            this.zones.first(a => a == zone).addEmployee(card);
            console.log(`${card.toString()} is moved from ${prevZone.name} to ${zone.name}`);
            prevZone = zone;
        }
    }

    moveCardById(cardId:number, zone:Zone): void{
        if(!this.employees.any(a => a.id == cardId)){
            console.log(`There is no employee with id ${cardId} in ${this.name} Centre`);
            return;
        }

        this.moveCard(this.employees.first(a => a.id == cardId), zone);
    }

    addZone(newZone: Zone, toZone: Zone = this.defaultOutsideZone){
        if(!this.zones.contains(toZone)){
            console.log(`${toZone.name} zone does not exists in ${this.name} Centre`);
            return;
        }

        this.zones.push(newZone);
        for(let zone of newZone.adjacentZones.toArray()){
            if(this.zones.contains(zone)) { continue; }
            this.addZone(zone, newZone);
        }
        this.zones.first(a => a == toZone).addAdjacentZone(newZone);
    }

    findCardLocation(card: Card) : Zone{
        return this.zones.where(a => a.employees.contains(card)).first() || null;
    }

    protected BFS(startZone : Zone) : Array<Zone | null>{
        let queue:Queue<Zone> = new Queue<Zone>();
        queue.enqueue(startZone);
        
        let visited = new Array<boolean>(this.zones.count()).fill(false);
        visited[this.zones.indexOf(startZone)] = true;

        let result = new Array<Zone | null>(this.zones.count()).fill(null);
        while(queue.length != 0){
            let zone = queue.dequeue();

            for(let adjZone of zone.adjacentZones.toArray()){
                let id = this.zones.indexOf(adjZone);
                if(!visited[id]){
                    queue.enqueue(adjZone);
                    visited[id] = true;
                    result[id] = zone;
                }
            }
        }
        return result;
    }

    protected getPath(start: Zone, destination:Zone, bfsResult: Array<Zone | null>){
        let path = Array<Zone>(bfsResult.length);

        for(let zone = destination as Zone | null; zone != null; zone = bfsResult[this.zones.indexOf(zone)]){
            path.push(zone);
        }
        //shortening the array to right size
        path = path.filter(a => a != null);
        //reversing so we have path start->destination
        path = path.reverse();

        //if there is a path between start and destination, start should have id 0; 
        if(path[0] == start){
            return path;
        }
        return new Array<Zone>();
    }

    protected addManagerCard(name: string, surname:string){
        let temp = new Array<ManagerCard>(this.cardFactory.managerMax - this.cardFactory.managerMin + 1);
        this.managers.forEach(a => temp[a.id - this.cardFactory.managerMin] = a);
        let id = temp.findIndex(a => a == null);
        let card = this.cardFactory.getManagerCard(id,name,surname) as ManagerCard;
        this.employees.push(card);
        this.defaultOutsideZone.addEmployee(card);
    }

    protected addAirstripCard(name: string, surname:string){
        let temp = new Array<AirstripCard>(this.cardFactory.airstripMax - this.cardFactory.airstripMin + 1);
        this.airstrips.forEach(a => temp[a.id - this.cardFactory.airstripMin] = a);
        let id = temp.findIndex(a => a == null);
        let card = this.cardFactory.getAirstripCard(id,name,surname) as AirstripCard;
        this.employees.push(card);
        this.defaultOutsideZone.addEmployee(card);
    }

    protected addSorterCard(name: string, surname:string){
        let temp = new Array<SorterCard>(this.cardFactory.sorterMax - this.cardFactory.sorterMin + 1);
        this.sorters.forEach(a => temp[a.id - this.cardFactory.sorterMin] = a);
        let id = temp.findIndex(a => a == null);
        let card = this.cardFactory.getSorterCard(id,name,surname) as SorterCard;
        this.employees.push(card);
        this.defaultOutsideZone.addEmployee(card);
    }

    protected addTransportCard(name: string, surname:string){
        let temp = new Array<TransportCard>(this.cardFactory.transportMax - this.cardFactory.transportMin + 1);
        this.transports.forEach(a => temp[a.id - this.cardFactory.transportMin] = a);
        let id = temp.findIndex(a => a == null);
        let card = this.cardFactory.getTransportCard(id,name,surname) as TransportCard;
        this.employees.push(card);
        this.defaultOutsideZone.addEmployee(card);
    }

    protected addJanitorCard(name: string, surname:string){
        let janitorsList = new List<JanitorCard>(this.janitors);

        let id = janitorsList.count() > 0 ? janitorsList.last().id - this.cardFactory.janitorMin + 1 : 0;
        let card = this.cardFactory.getJanitorCard(id, name,surname);
        this.employees.push(card);
        this.defaultOutsideZone.addEmployee(card);
    }
}

export { Centre }