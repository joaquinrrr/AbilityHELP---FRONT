import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../models/genders';
import { enviroment } from '../../enviroments/enviroment';
import { Subject } from 'rxjs';

const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class GendersService {
  private url = `${base_url}/gender`
  private urlinsert = `${base_url}/gender/Registro`
  private listaCambio = new Subject<Gender[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Gender[]>(this.url)
  }
  insert(g: Gender) {
    return this.http.post(this.urlinsert, g);
  }
  setList(listaNueva: Gender[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Gender>(`${this.url}/${id}`);
  }
  update(g: Gender, id:number) {
    return this.http.put(`${this.url}/${id}`, g);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
 //gender class entity///