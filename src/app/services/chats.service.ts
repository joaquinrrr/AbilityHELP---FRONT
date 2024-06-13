import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Subject } from 'rxjs';
import { Chats } from '../models/chats';
import { HttpClient } from '@angular/common/http';

const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  private url = `${base_url}/Chat`
  private urlinsert = `${base_url}/Chat/Registro`
  private listaCambio = new Subject<Chats[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Chats[]>(this.url)
  }
  insert(c: Chats) {
    return this.http.post(this.urlinsert, c);
  }
  setList(listaNueva: Chats[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Chats>(`${this.url}/${id}`);
  }
  update(c: Chats, id:number) {
    return this.http.put(`${this.url}/${id}`, c);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
