import { Component, OnInit } from '@angular/core';
import { PersonalitiesService } from '../../../services/personalities.service';
import { Personalities } from '../../../models/personalities';
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



@Component({
  selector: 'app-insertarpersonalidad',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,],
  templateUrl: './insertarpersonalidad.component.html',
  styleUrl: './insertarpersonalidad.component.css'
})
export class InsertarpersonalidadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  p: Personalities = new Personalities();
  edicionpersonalidad: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sP: PersonalitiesService,
    private router:Router,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicionpersonalidad = data['id'] != null;
      this.init();
    });
      this.form = this.formBuilder.group({
        codigo: [''],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
      });
  }
  registrar(): void {
    if (this.form.valid) {
      this.p.idPersonality = this.form.value.codigo;
      this.p.namePersonality = this.form.value.nombre;
      this.p.description = this.form.value.descripcion;
      if (this.edicionpersonalidad) {
        this.sP.update(this.p, this.p.idPersonality).subscribe((data) => {
          this.sP.list().subscribe((data) => {
            this.sP.setList(this.sortPersonalities(data));
          });
        });
      }else{
        this.sP.insert(this.p).subscribe((data) => {
          this.sP.list().subscribe((data) => {
            this.sP.setList(this.sortPersonalities(data));
          });
        });
      }
      this.router.navigate(['personalidades']);
    }
  }
  init() {
    if (this.edicionpersonalidad) {
      this.sP.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idPersonality),
          nombre: new FormControl(data.namePersonality),
          descripcion: new FormControl(data.description)
        });
      });
    }
  }

  sortPersonalities(personalities: Personalities[]): Personalities[] {
    return personalities.sort((a, b) => a.idPersonality - b.idPersonality);
  }
  
}
