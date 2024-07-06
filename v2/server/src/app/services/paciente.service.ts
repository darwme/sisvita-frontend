import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../utils/constants';
import { Historial,Historial_e } from '../models/historial';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private readonly BASE_URL: string;

  constructor(private http: HttpClient) {
    // Inicializa BASE_URL al construir el servicio.
    this.BASE_URL = getConexionBackend('gestor_historial_test');
  }

  getHistorialByIdTest(id: number): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.BASE_URL}/paciente/listar_h_test/${id}`);
  }

  getHistorialByIdTests(): Observable<Historial_e[]> {
    return this.http.get<Historial_e[]>(`${this.BASE_URL}/especialista/listar_h_pacientes`);
  }
}
