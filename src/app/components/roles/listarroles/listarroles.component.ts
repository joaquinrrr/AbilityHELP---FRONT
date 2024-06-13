import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Roles } from '../../../models/roles';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-listarroles',
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
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css'
})
export class ListarrolesComponent implements OnInit {
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'usuario',
    'rol',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sR: RolesService) {}
  ngOnInit(): void {
    this.sR.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sR.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.sR.eliminar(id).subscribe((data) => {
      this.sR.list().subscribe((data) => {
        this.sR.setList(data);
      });
    });
  }

}
