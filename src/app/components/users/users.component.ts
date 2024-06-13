import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusersComponent } from './listarusers/listarusers.component';
import { CrearusersComponent } from './crearusers/crearusers.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, ListarusersComponent, CrearusersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
}
