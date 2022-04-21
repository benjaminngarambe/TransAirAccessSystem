import { Centre } from "./Centre";
import { Role } from "./Card/Card"
import { ZoneFactory } from "./Zone/ZoneFactory";


class Tester{
    static WarsawTransAir: Centre = new Centre(0, "Warsaw");
    static readonly zoneFactory = new ZoneFactory();
    static sorting = this.zoneFactory.getSortingZone();
    static airstrip = this.zoneFactory.getAristripZone(this.sorting);
    static storage = this.zoneFactory.getStorageZone(this.sorting);
    static luzone = this.zoneFactory.getLoadUnloadZone(this.sorting);

    constructor(){
        Tester.initialize();
    }

    static initialize(){
        Tester.WarsawTransAir.addCard({name: "Javan", surname: "Chester", role: Role.Airstrip});      
        Tester.WarsawTransAir.addCard({name: "Elle", surname: "Parry", role: Role.Airstrip}); 
        Tester.WarsawTransAir.addCard({name: "Abbey", surname: "Griffin", role: Role.Airstrip}); 
        Tester.WarsawTransAir.addCard({name: "Skylar", surname: "Ewing", role: Role.Manager});
        Tester.WarsawTransAir.addCard({name: "Abida", surname: "Corrigan", role: Role.Manager}); 
        Tester.WarsawTransAir.addCard({name: "Arman", surname: "Mcnally", role: Role.Janitor});
        Tester.WarsawTransAir.addCard({name: "Leland", surname: "Orr", role: Role.Sorter}); 

        Tester.WarsawTransAir.addZone(Tester.luzone);
    }
}

export { Tester }