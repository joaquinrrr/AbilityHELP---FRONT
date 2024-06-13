import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarreunionesComponent } from './listarreuniones/listarreuniones.component';
import { CrearreunionesComponent } from './crearreuniones/crearreuniones.component';

@Component({
  selector: 'app-reuniones',
  standalone: true,
  imports: [RouterOutlet, ListarreunionesComponent, CrearreunionesComponent],
  templateUrl: './reuniones.component.html',
  styleUrl: './reuniones.component.css'
})
export class ReunionesComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
}
