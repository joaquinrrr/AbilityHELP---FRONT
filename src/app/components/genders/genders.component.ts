import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListargenerosComponent } from './listargeneros/listargeneros.component';

@Component({
  selector: 'app-genders',
  standalone: true,
  imports: [RouterOutlet, ListargenerosComponent],
  templateUrl: './genders.component.html',
  styleUrl: './genders.component.css'
})
export class GendersComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
}
