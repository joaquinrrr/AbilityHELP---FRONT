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
import { Chats } from '../../../models/chats';
import { Users } from '../../../models/users';
import { TypeInteraccion } from '../../../models/typeinteraction';
import { UsersService } from '../../../services/users.service';
import { ChatsService } from '../../../services/chats.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-crearchats',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './crearchats.component.html',
  styleUrl: './crearchats.component.css'
})
export class CrearchatsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  c: Chats = new Chats();
  currentUser: Users = new Users();
  listausuarios: Users[] = [];
  edicionchats: boolean = false;
  id: number = 0;
  mindate = new Date();
  maxDate = new Date(4000, 0, 1);

  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sC: ChatsService,
    private sL: LoginService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      mensaje: ['', Validators.required],
      fecha: [ new Date(), Validators.required], // Fecha actual y deshabilitada
      usuarioenvia: [''], // Este campo se establecerá automáticamente
      usuariorecibe: ['', Validators.required],
    });

    this.route.params.subscribe((data: Params) => {
      this.id = +data['id'];
      this.edicionchats = !!data['id'];
      if (this.edicionchats) {
        this.init();
      }
    });

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

    this.sU.list().subscribe((data) => {
      this.listausuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.c.idChat = formData.codigo;
      this.c.message = formData.mensaje;
      this.c.dateSend = formData.fecha;
      this.c.idStudentSender.idUser = formData.usuarioenvia;
      this.c.idStudentRecipient.idUser = formData.usuariorecibe;

      if (this.edicionchats) {
        this.sC.update(this.c, this.c.idChat).subscribe(() => {
          this.sC.list().subscribe((data) => {
            this.sC.setList(data);
          });
          this.router.navigate(['chats']);
        });
      } else {
        this.sC.insert(this.c).subscribe(() => {
          this.sC.list().subscribe((data) => {
            this.sC.setList(data);
          });
          this.router.navigate(['chats']);
        });
      }
    }
  }

  init(): void {
    if (this.edicionchats) {
      this.sC.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idChat,
          mensaje: data.message,
          fecha: new Date(data.dateSend),
          usuarioenvia: data.idStudentSender.idUser,
          usuariorecibe: data.idStudentRecipient.idUser,
        });
      });
    }
  }
}