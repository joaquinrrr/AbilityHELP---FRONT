import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Personalities } from '../models/personalities';
import { Observable, Subject } from 'rxjs';
import { Users } from '../models/users';

const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class PersonalitiesService {
  private url = `${base_url}/Personalities`
  private urlinsert = `${base_url}/Personalities/Registro`
  private listaCambio = new Subject<Personalities[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Personalities[]>(this.url)
  }
  insert(p: Personalities) {
    return this.http.post(this.urlinsert, p);
  }
  setList(listaNueva: Personalities[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Personalities>(`${this.url}/${id}`);
  }
  update(p: Personalities, id:number) {
    return this.http.put(`${this.url}/${id}`, p);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
