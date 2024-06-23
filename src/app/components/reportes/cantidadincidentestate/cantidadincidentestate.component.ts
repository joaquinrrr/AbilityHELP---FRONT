import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AssignincidentsService } from '../../../services/assignincidents.service';

@Component({
  selector: 'app-cantidadincidentestate',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidadincidentestate.component.html',
  styleUrls: ['./cantidadincidentestate.component.css']
})
export class CantidadincidentestateComponent implements OnInit {
  barChartOptions = {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(public sA: AssignincidentsService) {}

  ngOnInit(): void {
    this.sA.getQuantityIncidentState().subscribe((data) => {
      // Process data to get unique states and types
      const states = data.map(item => item.status);
      const uniqueStates = [...new Set(states)];
      const types = data.map(item => item.nameIncident);
      const uniqueTypes = [...new Set(types)];

      this.barChartLabels = uniqueStates;

      const bluePalette = this.generateBluePalette(uniqueTypes.length);

      const datasets = uniqueTypes.map((type, index) => {
        const dataForType = uniqueStates.map(state => {
          const incidentForStateAndType = data.find(item => item.status === state && item.nameIncident === type);
          return incidentForStateAndType ? incidentForStateAndType.quantity : 0;
        });
        return {
          data: dataForType,
          label: type,
          backgroundColor: bluePalette[index],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        };
      });

      this.barChartData = datasets;
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
