import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/test';
import { Seccion } from '../models/seccion';
import { Pregunta } from '../models/pregunta';
import { Opcion } from '../models/opcion';
import { Situacion } from '../models/situacion';
import { Rango } from '../models/rango';
import { Ubicacion } from '../models/ubicacion';

import { getConexionBackend } from './../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  service: string = 'ubicaciones';
  BASE_URL: string = getConexionBackend(this.service);
  constructor(private http: HttpClient) {}

  getAllUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.BASE_URL}`);
  }

}
