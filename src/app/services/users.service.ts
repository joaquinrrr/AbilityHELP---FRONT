import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Observable, Subject } from 'rxjs';
import { Gender } from '../models/genders';
import { Personalities } from '../models/personalities';

const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${base_url}/User`
  private urlinsert = `${base_url}/User/Registro`
  //private base_url_new = enviroment.base //para llamar a generos y personalidades
  private listaCambio = new Subject<Users[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Users[]>(this.url)
  }
  insert(u: Users) {
    return this.http.post(this.urlinsert, u);
  }
  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Users>(`${this.url}/${id}`);
  }
  update(u: Users) {
    return this.http.put(`${this.url}`,u);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
