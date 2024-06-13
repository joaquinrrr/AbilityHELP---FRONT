import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Schedules } from '../models/schedules';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private url = `${base_url}/Schedule`
  private urlinsert = `${base_url}/Schedule/Registro`
  private listaCambio = new Subject<Schedules[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Schedules[]>(this.url)
  }
  insert(s: Schedules) {
    return this.http.post(this.urlinsert, s);
  }
  setList(listaNueva: Schedules[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Schedules>(`${this.url}/${id}`);
  }
  update(s: Schedules, id:number) {
    return this.http.put(`${this.url}/${id}`, s);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
