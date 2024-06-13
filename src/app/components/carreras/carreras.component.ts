import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcarrerasComponent } from './listarcarreras/listarcarreras.component';
import { CrearcarrerasComponent } from './crearcarreras/crearcarreras.component';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [RouterOutlet, ListarcarrerasComponent, CrearcarrerasComponent],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.css'
})
export class CarrerasComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {
  }
}
