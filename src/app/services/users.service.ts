import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Observable, Subject } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

const base_url = enviroment.base;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${base_url}/User`;
  private urlinsert = `${base_url}/User/Registro`;
  private listaCambio = new Subject<Users[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url);
  }

  insert(u: Users): Observable<Users> {
    return this.http.post<Users>(this.urlinsert, u);
  }

  setList(listaNueva: Users[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Users[]> {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.url}/${id}`);
  }

  update(u: Users): Observable<void> {
    return this.http.put<void>(`${this.url}`, u);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listByRole(role: string): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.url}/role/${role}`);
  }
  
}
