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
import { RolesService } from '../../../services/roles.service';
import { Roles } from '../../../models/roles';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-crearroles',
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
    MatInputModule,],
  templateUrl: './crearroles.component.html',
  styleUrl: './crearroles.component.css'
})
export class CrearrolesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  r: Roles = new Roles();
  listarusers: Users[] = []
  edicionroles: boolean = false;
  id: number = 0;

  tiposroles: { value: string; viewValue: string }[] = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'COACH', viewValue: 'COACH' },
    { value: 'STUDENT', viewValue: 'STUDENT' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private sR: RolesService,
    private sU: UsersService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionroles = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      rol: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.sU.list().subscribe((data)=>{
      this.listarusers = data;
    })
  }
  registrar(): void {
    if (this.form.valid) {
      this.r.idRol = this.form.value.codigo;
      this.r.rol = this.form.value.rol;
      this.r.user.idUser = this.form.value.usuario;
      if (this.edicionroles) {
        this.sR.update(this.r, this.r.idRol).subscribe((data) => {
          this.sR.list().subscribe((data) => {
            this.sR.setList(data);
          });
        });
      } else {
        this.sR.insert(this.r).subscribe((data) => {
          this.sR.list().subscribe((data) => {
            this.sR.setList(data);
          });
        });
      }
      this.router.navigate(['roles']);
    }
  }
  init() {
    if (this.edicionroles) {
      this.sR.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRol),
          rol: new FormControl(data.rol),
          usuario: new FormControl(data.user.idUser),
        });
      });
    }
  }
}
