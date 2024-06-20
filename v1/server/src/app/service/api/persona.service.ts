import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getConexionBackend } from '../../utils/constants';
import { Persona } from '../../model/persona';
import {
  validatePersona,
  validatePartialPersona,
  validateAllPersonas,
} from '../../schema/persona';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  BASE_URL: string | undefined;

  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend('persona');
    console.log('URI: ', this.BASE_URL);
  }

  getPersonas(): Observable<Persona[]> {
    const input = this.http.get<Persona[]>(`${this.BASE_URL}/listar`);
    const result = validateAllPersonas(input);

    return result.success ? input : throwError(result.error);
  }

  getPersona(id: number): Observable<Persona> {
    const input = this.http.get<Persona>(`${this.BASE_URL}/${id}`);

    const result = validatePersona(input);
    return result.success ? input : throwError(result.error);
  }

  registrarPersona(persona: Persona) {
    const result = validatePersona(persona);
    return this.http.post<Persona>(`${this.BASE_URL}/`, result);
  }

  actualizarPersona(persona: Persona) {
    const result = validatePartialPersona(persona);

    return this.http.put<Persona>(
      `${this.BASE_URL}/${persona.id_persona}`,
      result
    );
  }

  eliminarPersona(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}
