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
export class CrearchatsComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  c: Chats = new Chats();
  listausuarios: Users[] = [];
  edicionchats: boolean = false;
  id: number = 0;
  mindate = new Date()
  maxDate = new Date(4000, 0, 1);


  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sC: ChatsService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionchats = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      mensaje: ['', Validators.required],
      fecha: ['', Validators.required],
      usuarioenvia: ['', Validators.required],
      usuariorecibe: ['', Validators.required],
    });
    this.sU.list().subscribe((data) => {
      this.listausuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.c.idChat = this.form.value.codigo
      this.c.message = this.form.value.mensaje
      this.c.dateSend = this.form.value.fecha
      this.c.idStudentSender.idUser = this.form.value.usuarioenvia
      this.c.idStudentRecipient.idUser = this.form.value.usuariorecibe
      if(this.edicionchats){
        this.sC.update(this.c, this.c.idChat).subscribe((data) => {
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
    this.router.navigate(['chats']);
    }
  }
  init() {
    if (this.edicionchats) {
      this.sC.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idChat),
          mensaje: new FormControl(data.message),
          fecha: new FormControl(data.dateSend),
          usuarioenvia: new FormControl(data.idStudentSender.idUser),
          usuariorecibe: new FormControl(data.idStudentRecipient.idUser),
        });
      });
    }
  }
}
