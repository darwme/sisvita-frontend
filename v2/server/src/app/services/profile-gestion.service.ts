import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getConexionBackend } from '../utils/constants';
import { Paciente } from '../models/profile';
import { Especialista } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileGestionService {
  private readonly BASE_URL: string;

  constructor(private http: HttpClient) {
    // Inicializa BASE_URL al construir el servicio.
    this.BASE_URL = getConexionBackend('gestion_profile');
  }

  getDatosPaciente(cod_paciente: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.BASE_URL}/v1/paciente/${cod_paciente}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDatosEspecialista(cod_especialista: string): Observable<Especialista> {
    return this.http.get<Especialista>(`${this.BASE_URL}/v1/especialista/${cod_especialista}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Ocurrió un error en la solicitud:', error);
    return throwError(error); // Lanza el error para que el componente lo maneje según sea necesario
  }
}
