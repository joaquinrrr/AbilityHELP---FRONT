import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Incidents } from '../../../models/incidents';
import { IncidentsService } from '../../../services/incidents.service';

@Component({
  selector: 'app-listrarincidentes',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listrarincidentes.component.html',
  styleUrl: './listrarincidentes.component.css'
})
export class ListrarincidentesComponent implements OnInit{
  dataSource: MatTableDataSource<Incidents> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'tipo',
    'descripcion',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sI: IncidentsService) {}

  ngOnInit(): void {
    this.sI.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sI.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.sI.eliminar(id).subscribe((data) => {
      this.sI.list().subscribe((data) => {
        this.sI.setList(data);
      });
    });
  }
}
