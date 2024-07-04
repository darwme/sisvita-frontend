import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../utils/constants';
import { Historial } from '../models/historial';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private readonly BASE_URL: string;

  constructor(private http: HttpClient) {
    // Inicializa BASE_URL al construir el servicio.
    this.BASE_URL = getConexionBackend('historial_test');
  }

  getHistorialByIdTest(id: number): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.BASE_URL}/usuario/${id}`);
  }

  getHistorialByIdTests(): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.BASE_URL}/listar`);
  }
}
