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
import { Interaction } from '../../../models/interaction';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { InteractionService } from '../../../services/interaction.service';
import { TypeinteractionService } from '../../../services/typeinteraction.service';
import { TypeInteraccion } from '../../../models/typeinteraction';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-crearinteraccion',
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
  templateUrl: './crearinteraccion.component.html',
  styleUrl: './crearinteraccion.component.css'
})
export class CrearinteraccionComponent implements OnInit {
  form: FormGroup;
  i: Interaction = new Interaction();
  currentUser: Users = new Users();
  listarusuarios: Users[] = [];
  listatipointera: TypeInteraccion[] = [];
  edicioninteraction: boolean = false;
  id: number = 0;
  mindate = new Date();
  maxDate = new Date(4000, 0, 1);

  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sI: InteractionService,
    private sTi: TypeinteractionService,
    private sL: LoginService
  ) {
    this.form = this.formBuilder.group({
      codigo: [''],
      fecha: ['', Validators.required],
      usuarioenvia: [''],
      usuariorecibe: ['', Validators.required],
      tipointeraccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const username = this.sL.showName();
    if (username) {
      this.sU.userlogin(username).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.form.patchValue({
            usuarioenvia: this.currentUser.idUser
          });
        },
        error: (err) => {
          console.error('Error fetching user data', err);
        }
      });
    }

    this.route.params.subscribe((data: Params) => {
      this.id = +data['id'];
      this.edicioninteraction = !!data['id'];
      if (this.edicioninteraction) {
        this.init();
      }
    });

    this.sU.list().subscribe((data) => {
      this.listarusuarios = data;
    });

    this.sTi.list().subscribe((data) => {
      this.listatipointera = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.i.id = formData.codigo;
      this.i.date = formData.fecha;
      this.i.studentSender.idUser = formData.usuarioenvia ;
      this.i.studentReceiver.idUser = formData.usuariorecibe ;
      this.i.idType.id = formData.tipointeraccion ;

      if (this.edicioninteraction) {
        this.sI.update(this.i, this.i.id).subscribe(() => {
          this.sI.list().subscribe((data) => {
            this.sI.setList(data);
            this.router.navigate(['interacciones']);
          });
        });
      } else {
        this.sI.insert(this.i).subscribe(() => {
          this.sI.list().subscribe((data) => {
            this.sI.setList(data);
            this.router.navigate(['interacciones']);
          });
        });
      }
    }
  }

  init(): void {
    if (this.edicioninteraction) {
      this.sI.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.id,
          fecha: data.date,
          usuarioenvia: data.studentSender.idUser,
          usuariorecibe: data.studentReceiver.idUser,
          tipointeraccion: data.idType.id
        });
      });
    }
  }
}