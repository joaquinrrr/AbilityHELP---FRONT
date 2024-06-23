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
import { LoginService } from '../../../services/login.service';

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
export class CrearreunionesComponent implements OnInit {
  form: FormGroup;
  m: Meetings = new Meetings();
  listarusuarios: Users[] = [];
  listahorarios: Schedules[] = [];
  edicionreunion: boolean = false;
  id: number = 0;
  currentUser: Users = new Users(); // Variable para almacenar el usuario actual

  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sM: MeetingsService,
    private sS: SchedulesService,
    private loginService: LoginService
  ) {
    this.form = this.formBuilder.group({
      codigo: [''],
      usuario: [{ value: '', disabled: true }, Validators.required], // Campo deshabilitado
      horario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionreunion = data['id'] != null;
      this.init();
    });

    this.sS.list().subscribe((data) => {
      this.listahorarios = data;
    });

    // Obtener el usuario actual utilizando el LoginService
    const username = this.loginService.showName();
    if (username) {
      this.sU.userlogin(username).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.form.patchValue({
            usuario: this.currentUser.idUser, // Establecer el usuario actual en el formulario
          });
        },
        error: (err) => {
          console.error('Error fetching user data', err);
        }
      });
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.m.idMeet = this.form.value.codigo;
      this.m.studentId.idUser = this.currentUser.idUser; // Asigna el usuario actual
      this.m.idmeetSchedule.idSchedule = this.form.value.horario;

      if (this.edicionreunion) {
        this.sM.update(this.m, this.m.idMeet).subscribe(
          () => {
            this.sM.list().subscribe((data) => {
              this.sM.setList(data);
            });
          },
          (error) => {
            console.error('Error al actualizar la reunión:', error);
          }
        );
      } else {
        this.sM.insert(this.m).subscribe(
          () => {
            this.sM.list().subscribe((data) => {
              this.sM.setList(data);
            });
          },
          (error) => {
            console.error('Error al insertar la reunión:', error);
          }
        );
      }
      this.router.navigate(['reuniones']);
    }
  }

  init() {
    if (this.edicionreunion) {
      this.sM.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idMeet,
          horario: data.idmeetSchedule.idSchedule,
        });
      });
    }
  }
}
