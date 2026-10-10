import { Component, OnInit, effect, inject, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { mensajeError } from '../../api';
import { ReporteBus, ReporteEstacion, ReporteLinea } from '../reporte.model';
import { ReporteService } from '../reporte.service';

// RF15: reportes de estaciones, líneas y buses asignados a cada una
@Component({
  selector: 'app-reportes-index',
  imports: [
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './reportes-index.html',
})
export class ReportesIndex implements OnInit {
  private service = inject(ReporteService);
  private snackBar = inject(MatSnackBar);

  lineas = new MatTableDataSource<ReporteLinea>([]);
  estaciones = new MatTableDataSource<ReporteEstacion>([]);
  buses = new MatTableDataSource<ReporteBus>([]);

  // Cada pestaña tiene su paginador y su orden; se crean cuando la pestaña se abre
  private paginadorLineas = viewChild<MatPaginator>('paginadorLineas');
  private paginadorEstaciones = viewChild<MatPaginator>('paginadorEstaciones');
  private paginadorBuses = viewChild<MatPaginator>('paginadorBuses');
  private ordenLineas = viewChild<MatSort>('ordenLineas');
  private ordenEstaciones = viewChild<MatSort>('ordenEstaciones');
  private ordenBuses = viewChild<MatSort>('ordenBuses');

  columnasLineas = [
    'linea',
    'municipalidad',
    'distancia',
    'estaciones',
    'buses',
    'rango',
    'cumple',
  ];
  columnasEstaciones = [
    'estacion',
    'municipalidad',
    'lineas',
    'accesos',
    'guardias',
    'operadores',
    'buses',
  ];
  columnasBuses = ['placa', 'capacidad', 'linea', 'parqueo', 'pilotos'];

  constructor() {
    effect(() => (this.lineas.paginator = this.paginadorLineas() ?? null));
    effect(() => (this.estaciones.paginator = this.paginadorEstaciones() ?? null));
    effect(() => (this.buses.paginator = this.paginadorBuses() ?? null));
    effect(() => (this.lineas.sort = this.ordenLineas() ?? null));
    effect(() => (this.estaciones.sort = this.ordenEstaciones() ?? null));
    effect(() => (this.buses.sort = this.ordenBuses() ?? null));
  }

  async ngOnInit() {
    try {
      const [lineas, estaciones, buses] = await Promise.all([
        this.service.lineas(),
        this.service.estaciones(),
        this.service.buses(),
      ]);
      this.lineas.data = lineas;
      this.estaciones.data = estaciones;
      this.buses.data = buses;
    } catch (error) {
      this.snackBar.open(mensajeError(error), 'Cerrar');
    }
  }

  filtrar<T>(fuente: MatTableDataSource<T>, texto: string) {
    fuente.filter = texto.trim().toLowerCase();
    fuente.paginator?.firstPage();
  }
}
