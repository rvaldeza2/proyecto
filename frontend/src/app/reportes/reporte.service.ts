import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_URL } from '../api';
import { ReporteBus, ReporteEstacion, ReporteLinea } from './reporte.model';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private http = inject(HttpClient);
  private url = `${API_URL}/reportes`;

  lineas() {
    return firstValueFrom(this.http.get<ReporteLinea[]>(`${this.url}/lineas`));
  }

  estaciones() {
    return firstValueFrom(this.http.get<ReporteEstacion[]>(`${this.url}/estaciones`));
  }

  buses() {
    return firstValueFrom(this.http.get<ReporteBus[]>(`${this.url}/buses`));
  }
}
