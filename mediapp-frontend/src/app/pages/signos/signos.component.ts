import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Signos } from 'src/app/_model/signos';
import { SignosService } from './../../_service/signos.service';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Signos>;
  displayedColumns: string[] = ['id','dni','nombres','apellidos','fecha', 'temperatura', 'pulso', 'ritmoRespiratorio', 'acciones'];
  cantidad: number = 0;

  constructor(
    private signosService: SignosService,
    private snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.signosService.listarPageable(0, 10).subscribe(data => {
      console.log(data);
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });

    this.signosService.getSignosCambio().subscribe(data =>{
      this.crearTabla(data);
    });

    this.signosService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    });
  }

  eliminar(id: number){
    this.signosService.eliminar(id).subscribe(() => {
      this.signosService.listar().subscribe(data => {
        this.signosService.setSignoscambio(data);
        this.signosService.setMensajeCambio('ELIMINADO');
      });
    });
  }

  crearTabla(data: Signos[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  mostrarMas(e: any){
    this.signosService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

}
