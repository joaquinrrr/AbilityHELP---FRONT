import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportesComponent implements OnInit{
  constructor (public route: ActivatedRoute){}
  ngOnInit(): void {
      
  }
}