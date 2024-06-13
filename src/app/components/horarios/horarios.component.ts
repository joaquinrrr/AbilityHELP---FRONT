import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarhorariosComponent } from './listarhorarios/listarhorarios.component';
import { CrearhorariosComponent } from './crearhorarios/crearhorarios.component';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [RouterOutlet, ListarhorariosComponent, CrearhorariosComponent],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
}
