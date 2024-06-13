import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrolesComponent } from './listarroles/listarroles.component';
import { CrearrolesComponent } from './crearroles/crearroles.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterOutlet, ListarrolesComponent, CrearrolesComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
}
