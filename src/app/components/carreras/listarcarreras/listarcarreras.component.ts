import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Carreras } from '../../../models/degrees';
import { DegreesService } from '../../../services/degrees.service';
import { LoginService } from '../../../services/login.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-listarcarreras',
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
  templateUrl: './listarcarreras.component.html',
  styleUrl: './listarcarreras.component.css'
})
export class ListarcarrerasComponent implements OnInit {
  dataSource: MatTableDataSource<Carreras> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'carrera',
    'usuario',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sC: DegreesService, private aPP: AppComponent) {}

  ngOnInit(): void {
    this.sC.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sC.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.sC.eliminar(id).subscribe((data) => {
      this.sC.list().subscribe((data) => {
        this.sC.setList(data);
      });
    });
  }
  isADMIN(): boolean {
    return this.aPP.isADMIN();
  }
  isCOACH(): boolean {
    return this.aPP.isCOACH();
  }
  isSTUDENT(): boolean {
    return this.aPP.isSTUDENT();
  }

  
}
