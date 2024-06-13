import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipointeraccionComponent } from './listartipointeraccion/listartipointeraccion.component';
import { CreartipointeraccionComponent } from './creartipointeraccion/creartipointeraccion.component';

@Component({
  selector: 'app-tipointeraccion',
  standalone: true,
  imports: [RouterOutlet, ListartipointeraccionComponent, CreartipointeraccionComponent],
  templateUrl: './tipointeraccion.component.html',
  styleUrl: './tipointeraccion.component.css'
})
export class TipointeraccionComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
}
