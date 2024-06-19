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
import { Carreras } from '../../../models/degrees';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { DegreesService } from '../../../services/degrees.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-crearcarreras',
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
  templateUrl: './crearcarreras.component.html',
  styleUrls: ['./crearcarreras.component.css']
})

export class CrearcarrerasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  c: Carreras = new Carreras();
  currentUser: Users = new Users();
  edicionusers: boolean = false;
  id: number = 0;

  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sC: DegreesService,
    private sL: LoginService
  ) {
    
  }

  ngOnInit(): void {
    const username = this.sL.showName();
    if (username) {
      this.sU.userlogin(username).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.form.patchValue({
            usuario: this.currentUser.idUser
          });
        },
        error: (err) => {
          console.error('Error fetching user data', err);
        }
      });
    }
    this.form = this.formBuilder.group({
      codigo: [''],
      carrera: ['', Validators.required],
      usuario: [''] 
    });
    this.route.params.subscribe((data: Params) => {
      this.id = +data['id'];
      this.edicionusers = !!data['id'];
      if (this.edicionusers) {
        this.init();
      }
    });
    
  }

  aceptar(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.c.idCarrera = formData.codigo;
      this.c.nameDegree = formData.carrera;
      this.c.user.idUser = formData.usuario; 

      if (this.edicionusers) {
        this.sC.update(this.c, this.c.idCarrera).subscribe(() => {
          this.sC.list().subscribe((data) => {
            this.sC.setList(data);
          });
          this.router.navigate(['carreras']);
        });
      } else {
        this.sC.insert(this.c).subscribe(() => {
          this.sC.list().subscribe((data) => {
            this.sC.setList(data);
          });
          this.router.navigate(['carreras']);
        });
      }
    }
  }

  init(): void {
    if (this.edicionusers) {
      this.sC.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idCarrera,
          carrera: data.nameDegree,
          usuario: data.user.idUser
        });
      });
    }
  }
}
