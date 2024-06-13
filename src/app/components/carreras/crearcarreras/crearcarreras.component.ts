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
  styleUrl: './crearcarreras.component.css'
})
export class CrearcarrerasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  c: Carreras = new Carreras();
  listausuarios: Users[] = [];
  edicionusers: boolean = false;
  id: number = 0;

  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sC: DegreesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionusers = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      carrera: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.sU.list().subscribe((data) => {
      this.listausuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.c.idCarrera = this.form.value.codigo
      this.c.nameDegree = this.form.value.carrera
      this.c.user.idUser = this.form.value.usuario
      if(this.edicionusers){
        this.sC.update(this.c, this.c.idCarrera).subscribe((data) => {
          this.sC.list().subscribe((data) => {
            this.sC.setList(data);
          });
        });
      }else{
        this.sC.insert(this.c).subscribe((data) => {
          this.sC.list().subscribe((data) => {
            this.sC.setList(data);
          });
        });
      }
    this.router.navigate(['carreras']);
    }
  }
  init() {
    if (this.edicionusers) {
      this.sC.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCarrera),
          carrera: new FormControl(data.nameDegree),
          usuario: new FormControl(data.user.idUser),
        });
      });
    }
  }
}
