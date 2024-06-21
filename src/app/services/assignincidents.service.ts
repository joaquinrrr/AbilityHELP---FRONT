import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { AssignIncidents } from '../models/assignincident';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AssignIncidentCountDTO } from '../models/assignIncidentCount';
import { QuantityIncidentState } from '../models/quantityIncidentState';
import { QuantityStudentIncidentDTO } from '../models/quantityStudentIncidentDTO';

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
  getIncidentCount(): Observable<AssignIncidentCountDTO[]>{
    return this.http.get<AssignIncidentCountDTO[]>(`${this.url}/incidentesOcurridos`);
  }
  getQuantityIncidentState(): Observable<QuantityIncidentState[]>{
    return this.http.get<QuantityIncidentState[]>(`${this.url}/cantidadIncidentesPorEstado`);
  }
  getQuantityStudentIncident(): Observable<QuantityStudentIncidentDTO[]>{
    return this.http.get<QuantityStudentIncidentDTO[]>(`${this.url}/cantidadUsuarioIncidentes`);
  }
}
