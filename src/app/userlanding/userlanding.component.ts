import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CrearuserComponent } from './crearuser/crearuser.component';

@Component({
  selector: 'app-userlanding',
  standalone: true,
  imports: [RouterOutlet,CrearuserComponent],
  templateUrl: './userlanding.component.html',
  styleUrl: './userlanding.component.css'
})
export class UserlandingComponent {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{}
}
