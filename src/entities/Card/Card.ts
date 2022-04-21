abstract class Card{
    readonly id: number;
    readonly ownerName: string;
    readonly ownerSurname: string;
    readonly role!: Role;

    constructor(id: number,  ownerName: string, ownerSurname: string) {
        this.id = id;
        this.ownerName = ownerName;
        this.ownerSurname = ownerSurname;
    }

    toString(){
        return `${this.ownerName} ${this.ownerSurname} (id:${this.id})`;
    }
}

enum Role {
    Manager,
    Airstrip,
    Sorter,
    Transport,
    Janitor
}

export { Card, Role };
