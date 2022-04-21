import { Card, Role } from "./Card";

class JanitorCard extends Card{
    override readonly role = Role.Janitor;
}

export { JanitorCard }