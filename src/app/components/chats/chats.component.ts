import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarchatsComponent } from './listarchats/listarchats.component';
import { CrearchatsComponent } from './crearchats/crearchats.component';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterOutlet, ListarchatsComponent, CrearchatsComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void{

  }
}
