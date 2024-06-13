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
import { Gender } from '../../../models/genders';
import { GendersService } from '../../../services/genders.service';

@Component({
  selector: 'app-creargeneros',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,],
  templateUrl: './creargeneros.component.html',
  styleUrl: './creargeneros.component.css'
})
export class CreargenerosComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  g: Gender = new Gender();
  ediciongender: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sG: GendersService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.ediciongender = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      genero: ['', Validators.required],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.g.idGender = this.form.value.codigo;
      this.g.nameGender = this.form.value.genero;
      if (this.ediciongender) {
        this.sG.update(this.g, this.g.idGender).subscribe((data) => {
          this.sG.list().subscribe((data) => {
            this.sG.setList(this.sortGenders(data));
          });
        });
      }else{
        this.sG.insert(this.g).subscribe((data) => {
          this.sG.list().subscribe((data) => {
            this.sG.setList(this.sortGenders(data));
          });
        });
      }
    this.router.navigate(['generos']);
    }
  }
  init() {
    if (this.ediciongender) {
      this.sG.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idGender),
          genero: new FormControl(data.nameGender),
        });
      });
    }
  }

  sortGenders(genders: Gender[]): Gender[] {
    return genders.sort((a, b) => a.idGender - b.idGender);
  }

}
