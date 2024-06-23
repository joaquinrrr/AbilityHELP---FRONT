import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { AssignIncidents } from '../models/assignincident';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class AssignincidentsService {
  private url = `${base_url}/AssignIncident`
  private urlinsert = `${base_url}/AssignIncident/Registro`
  private listaCambio = new Subject<AssignIncidents[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<AssignIncidents[]>(this.url)
  }
  insert(a: AssignIncidents) {
    return this.http.post(this.urlinsert, a);
  }
  setList(listaNueva: AssignIncidents[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<AssignIncidents>(`${this.url}/${id}`);
  }
  update(a: AssignIncidents, id:number) {
    return this.http.put(`${this.url}/${id}`, a);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
//AAAA//