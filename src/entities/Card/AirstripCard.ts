import { Card, Role } from "./Card";

class AirstripCard extends Card{
    override readonly role = Role.Airstrip;
}

export { AirstripCard }