import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { AssignincidentsService } from '../../../services/assignincidents.service';
import { AssignIncidents } from '../../../models/assignincident';

@Component({
  selector: 'app-listarasignacioninc',
  standalone: true,
  imports: [
    MatTableModule, 
    MatCardModule, 
    CommonModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './listarasignacioninc.component.html',
  styleUrl: './listarasignacioninc.component.css'
})
export class ListarasignacionincComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<AssignIncidents>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sA:AssignincidentsService){}
  ngOnInit(): void {
    this.sA.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(data);
    })
    this.sA.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
//eliminar
  eliminar(id: number) {
    this.sA.eliminar(id).subscribe((data) => {
      this.sA.list().subscribe((data) => {
        this.sA.setList(data);
      });
    });
  }
}
