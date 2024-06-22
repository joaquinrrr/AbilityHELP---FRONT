import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { AssignincidentsService } from '../../../services/assignincidents.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cantincidentesmes',
  standalone: true,
  imports: [BaseChartDirective, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './cantincidentesmes.component.html',
  styleUrls: ['./cantincidentesmes.component.css']
})
export class CantincidentesmesComponent implements OnInit {
  year: number = new Date().getFullYear(); // Por defecto, el año actual
  lineChartOptions = {
    responsive: true,
  };
  lineChartLabels: string[] = [];
  lineChartType: ChartType = 'line';
  lineChartLegend = true;
  lineChartData: ChartDataset[] = [];

  private monthOrder = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(private sA: AssignincidentsService) {}

  ngOnInit(): void {
    this.fetchIncidentData();
  }

  fetchIncidentData(): void {
    if (this.year) {
      this.sA.getQuantityIncidentMonth(this.year).subscribe((data) => {
        // Ordenar los datos por el orden de los meses
        data.sort((a, b) => this.monthOrder.indexOf(a.month) - this.monthOrder.indexOf(b.month));
        
        this.lineChartLabels = data.map((item) => item.month);
        this.lineChartData = [
          {
            data: data.map((item) => item.quantity),
            label: 'Cantidad de Incidentes',
            borderColor: '#4BACC6',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1,
          },
        ];
      });
    }
  }
}
