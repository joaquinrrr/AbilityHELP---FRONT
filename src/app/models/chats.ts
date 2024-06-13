import { Users } from "./users"

export class Chats{
    idChat: number=0
    message: string=""
    dateSend: Date = new Date(Date.now())
    idStudentSender: Users = new Users()
    idStudentRecipient: Users = new Users()
}