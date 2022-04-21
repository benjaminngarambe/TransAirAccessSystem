import { Card, Role } from "./Card";

class SorterCard extends Card{
    override readonly role = Role.Sorter;
}

export { SorterCard }