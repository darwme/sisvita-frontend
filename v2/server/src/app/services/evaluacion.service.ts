import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../utils/constants';
import { Evaluacion } from '../models/evaluacion';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private readonly BASE_URL: string;

  constructor(private http: HttpClient) {
    // Inicializa BASE_URL al construir el servicio.
    this.BASE_URL = getConexionBackend('evaluacion');
  }

  getEvaluacionTest(cod_historial: string): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(`${this.BASE_URL}/ver_evaluacion/${cod_historial}`);
  }


}
