import { Users } from "./users"

export class Schedules{
    idSchedule: number=0
    weekDay: Date = new Date(Date.now())
    startHour: Date = new Date(Date.now())
    finishHour: Date = new Date(Date.now())
    userCoach: Users = new Users()
}