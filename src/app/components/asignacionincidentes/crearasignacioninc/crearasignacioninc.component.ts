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
import { AssignIncidents } from '../../../models/assignincident';
import { Users } from '../../../models/users';
import { Incidents } from '../../../models/incidents';
import { UsersService } from '../../../services/users.service';
import { AssignincidentsService } from '../../../services/assignincidents.service';
import { IncidentsService } from '../../../services/incidents.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-crearasignacioninc',
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
  templateUrl: './crearasignacioninc.component.html',
  styleUrl: './crearasignacioninc.component.css'
})
export class CrearasignacionincComponent {
  form: FormGroup = new FormGroup({});
  a: AssignIncidents = new AssignIncidents();
  listarusuarios: Users[] = [];
  listaAdmins: Users[] = [];
  listarincidentes: Incidents[] = [];
  edicionasignarinci: boolean = false;
  id: number = 0;
  mindate = new Date();
  maxDate = new Date(4000, 0, 1);
  currentUser: Users = new Users(); // Variable para almacenar el usuario actual como reportador

  tiposdeestados: { value: string; viewValue: string }[] = [
    { value: 'ENVIADO', viewValue: 'ENVIADO' },
    { value: 'RESOLVIENDO', viewValue: 'RESOLVIENDO' },
    { value: 'SOLUCIONADO', viewValue: 'SOLUCIONADO' },
  ];

  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sA: AssignincidentsService,
    private sI: IncidentsService,
    private sL: LoginService // Inyecta el servicio LoginService aquí
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionasignarinci = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      estado: ['ENVIADO', Validators.required],
      fecha: ['', Validators.required],
      detalle: ['', Validators.required],
      admin: ['', Validators.required],
      reportador: ['', Validators.required], // Este campo será actualizado con el currentUser
      baneado: ['', Validators.required],
      incidentes: ['', Validators.required],
    });
    this.sU.list().subscribe((data) => {
      this.listarusuarios = data;
    });
    this.sI.list().subscribe((data) => {
      this.listarincidentes = data;
    });
    this.sU.listByRole('ADMIN').subscribe((data) => {
      this.listaAdmins = data;
    });

    // Obtener el currentUser como reportador
    const username = this.sL.showName();
    if (username) {
      this.sU.userlogin(username).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.form.patchValue({
            reportador: this.currentUser.idUser
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
      this.a.id = this.form.value.codigo;
      this.a.status = this.form.value.estado;
      this.a.dateAssign = this.form.value.fecha;
      this.a.detailIncident = this.form.value.detalle;
      this.a.idAdmin.idUser = this.form.value.admin;
      this.a.idStudentReporter.idUser = this.form.value.reportador;
      this.a.idStudentBan.idUser = this.form.value.baneado;
      this.a.incidents.id = this.form.value.incidentes;

      if (this.edicionasignarinci) {
        this.sA.update(this.a, this.a.id).subscribe((data) => {
          this.sA.list().subscribe((data) => {
            this.sA.setList(data);
          });
        });
      } else {
        this.sA.insert(this.a).subscribe((data) => {
          this.sA.list().subscribe((data) => {
            this.sA.setList(data);
          });
        });
      }
      this.router.navigate(['asignacion-incidentes']);
    }
  }

  init(): void {
    if (this.edicionasignarinci) {
      this.sA.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.id,
          estado: data.status,
          fecha: data.dateAssign,
          detalle: data.detailIncident,
          admin: data.idAdmin.idUser,
          reportador: data.idStudentReporter.idUser,
          baneado: data.idStudentBan.idUser,
          incidentes: data.incidents.id,
        });
      });
    }
  }

}