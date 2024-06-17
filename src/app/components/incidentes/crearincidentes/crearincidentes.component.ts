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
import { Incidents } from '../../../models/incidents';
import { IncidentsService } from '../../../services/incidents.service';



@Component({
  selector: 'app-crearincidentes',
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
  templateUrl: './crearincidentes.component.html',
  styleUrl: './crearincidentes.component.css'
})
export class CrearincidentesComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  i: Incidents = new Incidents();
  edicionusers: boolean = false;
  id: number = 0;

  constructor(
    private sI: IncidentsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}
// validar los datos a ingresar
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionusers = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.i.id = this.form.value.codigo
      this.i.typeIncident = this.form.value.tipo
      this.i.description = this.form.value.descripcion
      if(this.edicionusers){
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
    this.router.navigate(['incidentes']);
    }
  }
  init() {
    if (this.edicionusers) {
      this.sI.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          tipo: new FormControl(data.typeIncident),
          descripcion: new FormControl(data.description),
        });
      });
    }
  }
}
