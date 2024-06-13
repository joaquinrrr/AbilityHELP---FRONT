import { Gender } from "./genders";
import { Personalities } from "./personalities";

export class Users {
    idUser: number=0
    username: string=""
    emailUser: string=""
    password: string=""
    ageUser: number=0
    enabled: boolean=true
    gender: Gender = new Gender()
    personality: Personalities = new Personalities()
}