import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { ListarpersonalitiesComponent } from './listarpersonalities/listarpersonalities.component';
import { InsertarpersonalidadComponent } from './insertarpersonalidad/insertarpersonalidad.component';

@Component({
  selector: 'app-personalities',
  standalone: true,
  imports: [RouterOutlet, ListarpersonalitiesComponent, InsertarpersonalidadComponent],
  templateUrl: './personalities.component.html',
  styleUrl: './personalities.component.css'
})
export class PersonalitiesComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
  
}
