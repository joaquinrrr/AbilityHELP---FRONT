import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TypeInteraccion } from '../../../models/typeinteraction';
import { TypeinteractionService } from '../../../services/typeinteraction.service';

@Component({
  selector: 'app-creartipointeraccion',
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
  templateUrl: './creartipointeraccion.component.html',
  styleUrl: './creartipointeraccion.component.css'
})
export class CreartipointeraccionComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  t: TypeInteraccion = new TypeInteraccion();
  ediciontipo: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sT: TypeinteractionService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.ediciontipo = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      tipo: ['', Validators.required],
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.t.id = this.form.value.codigo;
      this.t.type = this.form.value.tipo;
      if (this.ediciontipo) {
        this.sT.update(this.t, this.t.id).subscribe((data) => {
          this.sT.list().subscribe((data) => {
            this.sT.setList(this.sortGenders(data));
          });
        });
      }else{
        this.sT.insert(this.t).subscribe((data) => {
          this.sT.list().subscribe((data) => {
            this.sT.setList(this.sortGenders(data));
          });
        });
      }
    this.router.navigate(['tipo-interacciones']);
    }
  }
  init() {
    if (this.ediciontipo) {
      this.sT.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          tipo: new FormControl(data.type),
        });
      });
    }
  }

  sortGenders(typee: TypeInteraccion[]): TypeInteraccion[] {
    return typee.sort((a, b) => a.id - b.id);
  }
}
