import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Subject } from 'rxjs';
import { Incidents } from '../models/incidents';
import { HttpClient } from '@angular/common/http';

const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  private url = `${base_url}/Incident`
  private urlinsert = `${base_url}/Incident/Registro`
  private listaCambio = new Subject<Incidents[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Incidents[]>(this.url)
  }
  insert(i: Incidents) {
    return this.http.post(this.urlinsert, i);
  }
  setList(listaNueva: Incidents[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Incidents>(`${this.url}/${id}`);
  }
  update(i: Incidents, id:number) {
    return this.http.put(`${this.url}/${id}`, i);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
} 
