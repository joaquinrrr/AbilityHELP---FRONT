import { Schedules } from "./schedules"
import { Users } from "./users"

export class Meetings{
    idMeet: number=0
    studentId: Users= new Users()
    idmeetSchedule: Schedules= new Schedules()
}