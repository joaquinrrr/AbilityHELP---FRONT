import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { Meetings } from '../models/meetings';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AverageMeetStudentDTO } from '../models/averageMeetStudentDTO';
import { QuantityMeetMonthDTO } from '../models/quantityMeetMonthDTO';
import { QuantityMeetCoachDTO } from '../models/quantityMeetCoachDTO';
import { meetStuDateDTO } from '../models/meetStuDateDTO';


const base_url = enviroment.base
@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private url = `${base_url}/meeting`
  private urlinsert = `${base_url}/meeting/Registro`
  private listaCambio = new Subject<Meetings[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Meetings[]>(this.url)
  }
  insert(m: Meetings) {
    return this.http.post(this.urlinsert, m);
  }
  setList(listaNueva: Meetings[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Meetings>(`${this.url}/${id}`);
  }
  update(m: Meetings, id:number) {
    return this.http.put(`${this.url}/${id}`, m);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getAverageMeetStudent(): Observable<AverageMeetStudentDTO[]> {
    return this.http.get<AverageMeetStudentDTO[]>(`${this.url}/promedioReunionUsuario`);
  }
  getMeetingMoth(year: number): Observable<QuantityMeetMonthDTO[]> {
    return this.http.get<QuantityMeetMonthDTO[]>(`${this.url}/cantidadReunionesPorMes?year=${year}`);
  }
  getQuantityMeetCoach(coach: string): Observable<QuantityMeetCoachDTO[]> {
    return this.http.get<QuantityMeetCoachDTO[]>(`${this.url}/cantidadMeetPorCoach?name=${coach}`);
  }
  getMeetStuDate(fecha: string): Observable<meetStuDateDTO[]> {
    return this.http.get<meetStuDateDTO[]>(`${this.url}/reunionporUsuarioyFecha?date=${fecha}`);
  }
}
