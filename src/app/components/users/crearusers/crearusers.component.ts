import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../../models/users';
import { Gender } from '../../../models/genders';
import { Personalities } from '../../../models/personalities';
import { UsersService } from '../../../services/users.service';
import { PersonalitiesService } from '../../../services/personalities.service';
import { GendersService } from '../../../services/genders.service';
import { RolesService } from '../../../services/roles.service';
import { Roles } from '../../../models/roles';

@Component({
  selector: 'app-crearusers',
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
  templateUrl: './crearusers.component.html',
  styleUrl: './crearusers.component.css',
})
export class CrearusersComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  u: Users = new Users();
  listageneros: Gender[] = [];
  listapersonalidades: Personalities[] = [];
  edicionusers: boolean = false;
  id: number = 0;

  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sP: PersonalitiesService,
    private sG: GendersService,
    private sR: RolesService // Inyectar RolesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionusers = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      contrasenia: ['', Validators.required],
      edad: [
        '',
        [
          Validators.required,
          Validators.min(15),
          Validators.max(99),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      enabled: [true],
      genero: ['', Validators.required],
      personalidad: ['', Validators.required],
    });
    this.sG.list().subscribe((data) => {
      this.listageneros = data;
    });
    this.sP.list().subscribe((data) => {
      this.listapersonalidades = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.u.idUser = this.form.value.codigo;
      this.u.username = this.form.value.nombre;
      this.u.emailUser = this.form.value.email;
      this.u.password = this.form.value.contrasenia;
      this.u.ageUser = this.form.value.edad;
      this.u.enabled = this.form.value.enabled;
      this.u.gender.idGender = this.form.value.genero;
      this.u.personality.idPersonality = this.form.value.personalidad;

      if (this.edicionusers) {
        this.sU.update(this.u).subscribe(() => {
          this.sU.list().subscribe((data) => {
            this.sU.setList(data);
          });
        });
      } else {
        this.sU.insert(this.u).subscribe((newUser: Users) => {
          if (newUser && newUser.idUser) {
            console.log('Usuario creado:', newUser);
            this.createRoleForUser(newUser.idUser); // Crear rol para el usuario
            this.sU.list().subscribe((data) => {
              this.sU.setList(data);
            });
            this.router.navigate(['usuarios']);
          } else {
            console.error('Error: Usuario no creado correctamente');
          }
        }, error => {
          console.error('Error al crear usuario:', error);
        });
      }
    }
  }

  createRoleForUser(userId: number): void {
    const newRole = new Roles();
    newRole.rol = 'STUDENT'; // o cualquier rol por defecto que desees asignar
    newRole.user = { idUser: userId } as Users;

    this.sR.insert(newRole).subscribe((data) => {
      this.sR.list().subscribe((data) => {
        this.sR.setList(data);
      });
    });
  }

  init() {
    if (this.edicionusers) {
      this.sU.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: data.idUser,
          nombre: data.username,
          email: data.emailUser,
          contrasenia: data.password,
          edad: data.ageUser,
          enabled: data.enabled,
          genero: data.gender.idGender,
          personalidad: data.personality.idPersonality,
        });
      });
    }
  }
}
