import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarinteraccionComponent } from './listarinteraccion/listarinteraccion.component';
import { CrearinteraccionComponent } from './crearinteraccion/crearinteraccion.component';

@Component({
  selector: 'app-interaccion',
  standalone: true,
  imports: [RouterOutlet, ListarinteraccionComponent, CrearinteraccionComponent],
  templateUrl: './interaccion.component.html',
  styleUrl: './interaccion.component.css'
})
export class InteraccionComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
}
