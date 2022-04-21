import { Card, Role } from "./Card";

class TransportCard extends Card{
    override readonly role = Role.Transport;
}

export { TransportCard }