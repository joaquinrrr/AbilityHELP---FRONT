import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Schedules } from '../../../models/schedules';
import { Users } from '../../../models/users';
import { SchedulesService } from '../../../services/schedules.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-crearhorarios',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './crearhorarios.component.html',
  styleUrl: './crearhorarios.component.css',
})
export class CrearhorariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  s: Schedules = new Schedules();
  listausuarios: Users[] = [];
  edicionhorarios: boolean = false;
  id: number = 0;
  mindate = new Date()
  maxDate = new Date(4000, 0, 1);

  constructor(
    private sS: SchedulesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sU: UsersService,
  ) {}
  //validar los campos que requiere la tabla horarios
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionhorarios = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      dia: ['', Validators.required],
      horainicio: ['', Validators.required],
      horafin: ['', Validators.required],
      coach: ['', Validators.required],
    });
    this.sU.list().subscribe((data) => {
      this.listausuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      const date = this.form.value.dia;
      const startTime = this.form.value.horainicio;
      const endTime = this.form.value.horafin;
  
      const startDateTime = this.combineDateAndTime(date, startTime);
      const endDateTime = this.combineDateAndTime(date, endTime);
  
      this.s.idSchedule = this.form.value.codigo;
      this.s.weekDay = date; // Puedes guardar la fecha directamente si es necesario
      this.s.startHour = new Date(startDateTime);
      this.s.finishHour = new Date(endDateTime);
      this.s.userCoach.idUser = this.form.value.coach;
  
      console.log('Datos enviados:', JSON.stringify(this.s, null, 2));
  
      if(this.edicionhorarios){
        this.sS.update(this.s, this.s.idSchedule).subscribe(
          () => {
            this.sS.list().subscribe((data) => {
              this.sS.setList(data);
            });
          },
          (error) => {
            console.error('Error al actualizar el horario:', error);
          }
        );
      }else{
        this.sS.insert(this.s).subscribe(
          () => {
            this.sS.list().subscribe((data) => {
              this.sS.setList(data);
            });
          },
          (error) => {
            console.error('Error al insertar el horario:', error);
          }
        );
      }
      this.router.navigate(['horarios']);
    }
  }
  
  combineDateAndTime(date: Date, time: string): string {
    const datePart = date.toISOString().split('T')[0];
    return `${datePart} ${this.convertTo24HourFormat(time)}`;
  }
  
  convertTo24HourFormat(time: string): string {
    // Convert the time from 12-hour format to 24-hour format
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    return `${hours}:${minutes}:00`;
  }

  init() {
    if (this.edicionhorarios) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idSchedule),
          dia: new FormControl(data.weekDay),
          horainicio: new FormControl(data.startHour),
          horafin: new FormControl(data.finishHour),
          coach: new FormControl(data.userCoach.idUser),
        });
      });
    }
  }
}
