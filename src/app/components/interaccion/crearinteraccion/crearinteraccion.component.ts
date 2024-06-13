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
export class CrearinteraccionComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  i: Interaction = new Interaction();
  listarusuarios: Users[] = [];
  listatipointera: TypeInteraccion[] = [];
  edicioninteraction: boolean = false;
  id: number = 0;
  mindate = new Date()
  maxDate = new Date(4000, 0, 1);

  constructor(
    private sU: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sI: InteractionService,
    private sTi: TypeinteractionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicioninteraction = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      fecha: ['', Validators.required],
      usuarioenvia: ['', Validators.required],
      usuariorecibe: ['', Validators.required],
      tipointeraccion: ['', Validators.required],
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
      this.i.id = this.form.value.codigo
      this.i.date = this.form.value.fecha
      this.i.studentSender.idUser = this.form.value.usuarioenvia
      this.i.studentReceiver.idUser = this.form.value.usuariorecibe
      this.i.idType.id = this.form.value.tipointeraccion
      if(this.edicioninteraction){
        this.sI.update(this.i, this.i.id).subscribe((data) => {
          this.sI.list().subscribe((data) => {
            this.sI.setList(data);
          });
        });
      }else{
        this.sI.insert(this.i).subscribe((data) => {
          this.sI.list().subscribe((data) => {
            this.sI.setList(data);
          });
        });
      }
    this.router.navigate(['interacciones']);
    }
  }
  init() {
    if (this.edicioninteraction) {
      this.sI.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          fecha: new FormControl(data.date),
          usuarioenvia: new FormControl(data.studentSender.idUser),
          usuariorecibe: new FormControl(data.studentReceiver.idUser),
          tipointeraccion: new FormControl(data.idType.id),
        });
      });
    }
  }
}
