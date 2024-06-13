import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarasignacionincComponent } from './listarasignacioninc/listarasignacioninc.component';
import { CrearasignacionincComponent } from './crearasignacioninc/crearasignacioninc.component';

@Component({
  selector: 'app-asignacionincidentes',
  standalone: true,
  imports: [RouterOutlet, ListarasignacionincComponent, CrearasignacionincComponent],
  templateUrl: './asignacionincidentes.component.html',
  styleUrl: './asignacionincidentes.component.css'
})
export class AsignacionincidentesComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {
  }
}
