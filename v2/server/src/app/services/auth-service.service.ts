import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../utils/constants';
import { Paciente } from '../models/paciente';
import { Usuario } from '../models/usuario';
import { Especialista } from '../models/especialista';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  service: string = 'gestor_auth';
  BASE_URL: string | undefined;

  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend(this.service);
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, usuario);
  }

  registerPaciente(paciente: Paciente): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register/paciente`, paciente);
  }

  registrarEspecialista(especialista: Especialista): Observable<Especialista> {
    return this.http.post<Especialista>(`${this.BASE_URL}/register/especialista`,especialista);
  }
}
