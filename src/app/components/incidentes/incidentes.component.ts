import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListrarincidentesComponent } from './listrarincidentes/listrarincidentes.component';
import { CrearincidentesComponent } from './crearincidentes/crearincidentes.component';

@Component({
  selector: 'app-incidentes',
  standalone: true,
  imports: [RouterOutlet, ListrarincidentesComponent, CrearincidentesComponent],
  templateUrl: './incidentes.component.html',
  styleUrl: './incidentes.component.css'
})
export class IncidentesComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
}
