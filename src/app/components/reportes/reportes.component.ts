import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ConteoasignacionincidentesComponent } from './conteoasignacionincidentes/conteoasignacionincidentes.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, ConteoasignacionincidentesComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit{
  constructor (public route: ActivatedRoute){}
  ngOnInit(): void {
      
  }
}
