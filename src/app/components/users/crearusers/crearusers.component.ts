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
import { Users } from '../../../models/users';
import { Gender } from '../../../models/genders';
import { Personalities } from '../../../models/personalities';
import { UsersService } from '../../../services/users.service';
import { PersonalitiesService } from '../../../services/personalities.service';
import { GendersService } from '../../../services/genders.service';

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
    private sG: GendersService
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
      this.u.idUser = this.form.value.codigo
      this.u.username = this.form.value.nombre
      this.u.emailUser = this.form.value.email
      this.u.password = this.form.value.contrasenia
      this.u.ageUser = this.form.value.edad
      this.u.enabled = this.form.value.enabled
      this.u.gender.idGender = this.form.value.genero
      this.u.personality.idPersonality = this.form.value.personalidad
      if(this.edicionusers){
        this.sU.update(this.u).subscribe((data) => {
          this.sU.list().subscribe((data) => {
            this.sU.setList(data);
          });
        });
      }else{
        this.sU.insert(this.u).subscribe((data) => {
          this.sU.list().subscribe((data) => {
            this.sU.setList(data);
          });
        });
      }
    this.router.navigate(['usuarios']);
    }
  }
  init() {
    if (this.edicionusers) {
      this.sU.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUser),
          nombre: new FormControl(data.username),
          email: new FormControl(data.emailUser),
          contrasenia: new FormControl(data.password),
          edad: new FormControl(data.ageUser),
          enabled: new FormControl(data.enabled),
          genero: new FormControl(data.gender.idGender),
          personalidad: new FormControl(data.personality.idPersonality),
        });
      });
    }
  }
}
