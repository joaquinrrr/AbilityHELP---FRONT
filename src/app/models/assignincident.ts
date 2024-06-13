import { Incidents } from "./incidents"
import { Users } from "./users"

export class AssignIncidents{
    id: number=0
    status: string=""
    dateAssign: Date = new Date(Date.now())
    detailIncident: string=""
    idAdmin: Users = new Users()
    idStudentReporter: Users = new Users()
    idStudentBan: Users = new Users()
    incidents: Incidents = new Incidents()
}