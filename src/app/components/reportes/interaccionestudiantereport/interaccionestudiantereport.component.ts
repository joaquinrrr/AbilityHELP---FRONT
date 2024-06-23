import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../../../services/interaction.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-interaccionestudiantereport',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, MatButtonModule],
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
