import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Subject } from 'rxjs';
import { TypeInteraccion } from '../models/typeinteraction';
import { HttpClient } from '@angular/common/http';


const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class TypeinteractionService {
  private url = `${base_url}/TypeInteraction`
  private urlinsert = `${base_url}/TypeInteraction/Registro`
  //private base_url_new = enviroment.base //para llamar a generos y personalidades
  private listaCambio = new Subject<TypeInteraccion[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<TypeInteraccion[]>(this.url)
  }
  insert(t: TypeInteraccion) {
    return this.http.post(this.urlinsert, t);
  }
  setList(listaNueva: TypeInteraccion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<TypeInteraccion>(`${this.url}/${id}`);
  }
  update(t: TypeInteraccion, id: number) {
    return this.http.put(`${this.url}/${id}`,t);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
