import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/roles';
import { Observable, Subject } from 'rxjs';
import { QuantityUserRolDTO } from '../models/quantityUserRolDTO';

const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = `${base_url}/Rol`
  private urlinsert = `${base_url}/Rol/Registro`
  private listaCambio = new Subject<Roles[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Roles[]>(this.url)
  }
  insert(r: Roles) {
    return this.http.post(this.urlinsert, r);
  }
  setList(listaNueva: Roles[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Roles>(`${this.url}/${id}`);
  }
  update(r: Roles, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getQuantityUserRol(): Observable<QuantityUserRolDTO[]> {
    return this.http.get<QuantityUserRolDTO[]>(`${this.url}/cantidadUsuariosPorRol`);
  }
}
