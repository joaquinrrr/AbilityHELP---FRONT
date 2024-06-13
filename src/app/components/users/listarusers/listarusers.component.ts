import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../models/users';

@Component({
  selector: 'app-listarusers',
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
  templateUrl: './listarusers.component.html',
  styleUrl: './listarusers.component.css'
})
export class ListarusersComponent implements OnInit{
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'email',
    'edad',
    'genero',
    'personalidad',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sU: UsersService) {}

  ngOnInit(): void {
    this.sU.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sU.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.sU.eliminar(id).subscribe((data) => {
      this.sU.list().subscribe((data) => {
        this.sU.setList(data);
      });
    });
  }
  
}
