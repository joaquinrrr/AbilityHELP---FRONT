import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { DegreesService } from '../../../services/degrees.service';
import { ChartDataset, ChartType } from 'chart.js';

@Component({
  selector: 'app-cantidadpersonalidadcarreraestudiante',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidadpersonalidadcarreraestudiante.component.html',
  styleUrls: ['./cantidadpersonalidadcarreraestudiante.component.css'] // corregir 'styleUrl' a 'styleUrls'
})
export class CantidadpersonalidadcarreraestudianteComponent implements OnInit {
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

  constructor(public sD: DegreesService) {}

  ngOnInit(): void {
    this.sD.getQuantityPersoDegreStudent().subscribe((data) => {
      // Process data to get unique degrees and personalities
      const degrees = data.map(item => item.degree);
      const uniqueDegrees = [...new Set(degrees)];
      const personalities = data.map(item => item.personaltity);
      const uniquePersonalities = [...new Set(personalities)];

      this.barChartLabels = uniqueDegrees;

      const bluePalette = this.generateBluePalette(uniquePersonalities.length);

      const datasets = uniquePersonalities.map((personality, index) => {
        const dataForPersonality = uniqueDegrees.map(degree => {
          const entryForDegreeAndPersonality = data.find(item => item.degree === degree && item.personaltity === personality);
          return entryForDegreeAndPersonality ? entryForDegreeAndPersonality.quantity : 0;
        });
        return {
          data: dataForPersonality,
          label: personality,
          backgroundColor: bluePalette[index],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        };
      });

      this.barChartData = datasets;
    });
  }

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
