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
import { Interaction } from '../../../models/interaction';
import { InteractionService } from '../../../services/interaction.service';

@Component({
  selector: 'app-listarinteraccion',
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
  templateUrl: './listarinteraccion.component.html',
  styleUrl: './listarinteraccion.component.css'
})
export class ListarinteraccionComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['codigo', 'fecha', 'estudiante_envia', 'estudiante_recibe', 'tipo_interaccion']
  dataSource: MatTableDataSource<Interaction>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sI:InteractionService){}
  ngOnInit(): void {
    this.sI.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortGenders(data));
    })
    this.sI.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortGenders(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sI.eliminar(id).subscribe((data) => {
      this.sI.list().subscribe((data) => {
        this.sI.setList(this.sortGenders(data));
      });
    });
  }

  sortGenders(interaction: Interaction[]): Interaction[] {
    return interaction.sort((a, b) => a.id - b.id);
  }
}
