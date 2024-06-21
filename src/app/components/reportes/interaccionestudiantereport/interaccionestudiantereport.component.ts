import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../../../services/interaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interaccionestudiantereport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interaccionestudiantereport.component.html',
  styleUrls: ['./interaccionestudiantereport.component.css'],
})
export class InteraccionestudiantereportComponent implements OnInit {
  interactionData: any[] = [];

  constructor(private interactionsService: InteractionService) {}

  ngOnInit(): void {
    this.interactionsService.getInteractionStudent().subscribe((data) => {
      this.interactionData = data;
    });
  }
}
