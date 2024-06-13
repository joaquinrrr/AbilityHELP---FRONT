import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Interaction } from '../models/interaction';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private url = `${base_url}/Interaction`
  private urlinsert = `${base_url}/Interaction/Registro`
  private listaCambio = new Subject<Interaction[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Interaction[]>(this.url)
  }
  insert(i: Interaction) {
    return this.http.post(this.urlinsert, i);
  }
  setList(listaNueva: Interaction[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Interaction>(`${this.url}/${id}`);
  }
  update(i: Interaction, id:number) {
    return this.http.put(`${this.url}/${id}`, i);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
