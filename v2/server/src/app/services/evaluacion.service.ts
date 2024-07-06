import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../utils/constants';
import { Evaluacion } from '../models/evaluacion';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService {
  private readonly BASE_URL: string;

  constructor(private http: HttpClient) {
    // Inicializa BASE_URL al construir el servicio.
    this.BASE_URL = getConexionBackend('gestor_evaluacion');
  }

  //ver el evaluacion test sel codigo del historial test
  getEvaluacionTest(cod_historial: string): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(
      `${this.BASE_URL}/ver_evaluacion/${cod_historial}`
    );
  }
  //para que?
  getHistorialByIdTest(cod_historial: string): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(
      `${this.BASE_URL}/ver_evaluacion/${cod_historial}`
    );
  }

  postEnviarEvaluacion(
    evaluacion: Evaluacion,
    codigo_especialista: string,
    codigo_historial_test: string
  ): Observable<Evaluacion> {
    console.log('EN SERVICIO://enviando evaluacion: ', evaluacion);
    console.log('codigo especialista: ', codigo_especialista);
    console.log('codigo historial test: ', codigo_historial_test);
    return this.http.post<Evaluacion>(
      `${this.BASE_URL}/crear_evaluacion/${codigo_historial_test}/${codigo_especialista}`,
      evaluacion
    );
  }
}
