import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../models/users';
import { Gender } from '../../models/genders';
import { Personalities } from '../../models/personalities';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { PersonalitiesService } from '../../services/personalities.service';
import { GendersService } from '../../services/genders.service';
import { RolesService } from '../../services/roles.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Roles } from '../../models/roles';

@Component({
  selector: 'app-crearuser',
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
    MatIconModule
  ],
  templateUrl: './crearuser.component.html',
  styleUrl: './crearuser.component.css'
})
export class CrearuserComponent {
  form: FormGroup = new FormGroup({});
  u: Users = new Users();
  listageneros: Gender[] = [];
  listapersonalidades: Personalities[] = [];
  edicionusers: boolean = false;
  id: number = 0;
  hidePassword: boolean = true;

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

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  aceptar(): void {
    if (this.form.valid) {
      this.u.idUser = this.form.value.codigo;
      this.u.username = this.form.value.nombre;
      this.u.emailUser = this.form.value.email;
      this.u.password = this.form.value.contrasenia;
      this.u.ageUser = this.form.value.edad;
      this.u.enabled = this.form.value.enabled;
      this.u.gender.idGender = this.form.value.genero
      this.u.personality.idPersonality = this.form.value.personalidad

      if (this.edicionusers) {
        this.sU.update(this.u).subscribe(() => {
          this.sU.list().subscribe((data) => {
            this.sU.setList(data);
          });
          this.router.navigate(['userlanding']);
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
    newRole.rol = 'STUDENT'; 
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
        this.form.setValue({
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
