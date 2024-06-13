import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meetings } from '../../../models/meetings';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { MeetingsService } from '../../../services/meetings.service';
import { Schedules } from '../../../models/schedules';
import { SchedulesService } from '../../../services/schedules.service';

@Component({
  selector: 'app-crearreuniones',
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
  ],
  templateUrl: './crearreuniones.component.html',
  styleUrl: './crearreuniones.component.css'
})
export class CrearreunionesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  m: Meetings = new Meetings();
  listarusuarios: Users[] = [];
  listahorarios: Schedules[] = [];
  edicionreunion: boolean = false;
  id: number = 0;

  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sM: MeetingsService,
    private sS: SchedulesService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionreunion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      usuario: ['', Validators.required],
      horario: ['', Validators.required],
    });
    this.sS.list().subscribe((data) => {
      this.listahorarios = data;
    });
    this.sU.list().subscribe((data) => {
      this.listarusuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.m.idMeet = this.form.value.codigo
      this.m.studentId.idUser = this.form.value.usuario
      this.m.idmeetSchedule.idSchedule = this.form.value.horario
      if(this.edicionreunion){
        this.sM.update(this.m, this.m.idMeet).subscribe((data) => {
          this.sM.list().subscribe((data) => {
            this.sM.setList(data);
          });
        });
      }else{
        this.sM.insert(this.m).subscribe((data) => {
          this.sM.list().subscribe((data) => {
            this.sM.setList(data);
          });
        });
      }
    this.router.navigate(['reuniones']);
    }
  }
  init() {
    if (this.edicionreunion) {
      this.sM.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMeet),
          usuario: new FormControl(data.studentId.idUser),
          horario: new FormControl(data.idmeetSchedule.idSchedule),
        });
      });
    }
  }
}
