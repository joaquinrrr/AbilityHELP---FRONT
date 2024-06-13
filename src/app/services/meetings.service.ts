import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Meetings } from '../models/meetings';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private url = `${base_url}/meeting`
  private urlinsert = `${base_url}/meeting/Registro`
  private listaCambio = new Subject<Meetings[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Meetings[]>(this.url)
  }
  insert(m: Meetings) {
    return this.http.post(this.urlinsert, m);
  }
  setList(listaNueva: Meetings[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Meetings>(`${this.url}/${id}`);
  }
  update(m: Meetings, id:number) {
    return this.http.put(`${this.url}/${id}`, m);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
