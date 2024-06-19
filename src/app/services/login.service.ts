import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';
import { Users } from '../models/users';
import { enviroment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';

const base_url = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${base_url}/User`;

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post('http://localhost:8082/login', request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    return decodedToken?.role;
  }
  showName(){
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    return decodedToken?.sub;
  }
  userlogin(nombre: string): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.url}/nombreusuario?nombreuser=${nombre}`);
  }
  
}
