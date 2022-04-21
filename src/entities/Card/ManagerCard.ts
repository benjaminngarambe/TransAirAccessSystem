import { Card, Role } from "./Card";

class ManagerCard extends Card{
    override readonly role = Role.Manager;
}

export { ManagerCard }