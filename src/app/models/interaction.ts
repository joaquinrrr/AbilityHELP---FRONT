import { TypeInteraccion } from "./typeinteraction";
import { Users } from "./users";

export class Interaction {
    id: number = 0;
    date: Date = new Date(Date.now())
    studentSender: Users = new Users()
    studentReceiver: Users = new Users()
    idType: TypeInteraccion = new TypeInteraccion()
}