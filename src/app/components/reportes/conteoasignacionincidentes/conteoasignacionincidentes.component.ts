import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AssignincidentsService } from '../../../services/assignincidents.service';

@Component({
  selector: 'app-conteoasignacionincidentes',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './conteoasignacionincidentes.component.html',
  styleUrls: ['./conteoasignacionincidentes.component.css']
})
export class ConteoasignacionincidentesComponent implements OnInit {
  barChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(public sA: AssignincidentsService ) {}

  ngOnInit(): void {
    this.sA.getIncidentCount().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.TypeInci);
      this.barChartData = [
        {
          data: data.map((item) => item.quantity),
          label: 'Cantidad de Incidentes',
          backgroundColor: this.generateBluePalette(data.length),
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }

  // Helper method to generate a palette of blue colors
  generateBluePalette(count: number): string[] {
    const baseColor = [70, 130, 180]; // RGB for steelblue
    const palette = [];
    for (let i = 0; i < count; i++) {
      const factor = i / count;
      const color = baseColor.map(c => Math.round(c * (1 - factor)));
      palette.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    }
    return palette;
  }
}
