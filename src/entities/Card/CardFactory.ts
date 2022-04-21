import { AirstripCard } from "./AirstripCard";
import { JanitorCard } from "./JanitorCard";
import { ManagerCard } from "./ManagerCard";
import { SorterCard } from "./SorterCard";
import { TransportCard } from "./TransportCard";

class CardFactory{
    readonly managerMin: number;
    readonly managerMax: number;
    readonly airstripMin: number;
    readonly airstripMax: number;
    readonly sorterMin: number;
    readonly sorterMax: number;
    readonly transportMin: number;
    readonly transportMax: number;
    readonly janitorMin: number;

    constructor(
        managerMin: number = 0, 
        managerMax: number = 99,
        airstripMin: number = 100,
        airstripMax: number = 200,
        sorterMin: number = 201,
        sorterMax: number = 500,
        transportMin: number = 501,
        transportMax: number = 999,
        janitorMin: number = 1000){
            this.managerMin = managerMin;
            this.managerMax = managerMax;
            this.airstripMin = airstripMin;
            this.airstripMax = airstripMax;
            this.sorterMin = sorterMin;
            this.sorterMax = sorterMax;
            this.transportMin = transportMin;
            this.transportMax = transportMax;
            this.janitorMin = janitorMin;
    }

    getManagerCard(id:number, name: string, surname:string): ManagerCard | null {
        if(id > this.managerMax) { console.log("Incorrect id"); return null; }
        return new ManagerCard(this.managerMin + id, name, surname);
    }

    getAirstripCard(id:number, name: string, surname:string): AirstripCard | null {
        if(id > this.airstripMax) { console.log("Incorrect id"); return null; }
        return new AirstripCard(this.airstripMin + id, name, surname);
    }

    getSorterCard(id:number, name: string, surname:string): SorterCard | null {
        if(id > this.sorterMax) { console.log("Incorrect id"); return null; }
        return new SorterCard(this.sorterMin + id, name, surname);
    }

    getTransportCard(id:number, name: string, surname:string): TransportCard | null {
        if(id > this.sorterMax) { console.log("Incorrect id"); return null; }
        return new TransportCard(this.transportMin + id, name, surname);
    }

    getJanitorCard(id:number, name: string, surname:string): JanitorCard {
        return new JanitorCard(this.janitorMin + id, name, surname);
    }
}

export { CardFactory }