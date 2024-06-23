import { Injectable } from '@angular/core';
import { Carreras } from '../models/degrees';
import { enviroment } from '../../enviroments/enviroment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuantityPersoDegreeStudentDTO } from '../models/quantityPersoDegreeStudentDTO';


const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class DegreesService {
  private url = `${base_url}/Degree`
  private urlinsert = `${base_url}/Degree/Registro`
  private listaCambio = new Subject<Carreras[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Carreras[]>(this.url)
  }
  insert(c: Carreras) {
    return this.http.post(this.urlinsert, c);
  }
  setList(listaNueva: Carreras[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Carreras>(`${this.url}/${id}`);
  }
  update(c: Carreras, id:number) {
    return this.http.put(`${this.url}/${id}`, c);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getQuantityPersoDegreStudent(): Observable<QuantityPersoDegreeStudentDTO[]> {
    return this.http.get<QuantityPersoDegreeStudentDTO[]>(`${this.url}/cantidadPersonalidadyCarreraEstudiante`);
  }
}
