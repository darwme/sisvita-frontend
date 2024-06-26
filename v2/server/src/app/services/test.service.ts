import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/test';
import { Seccion } from '../models/seccion';
import { Pregunta } from '../models/pregunta';
import { Opcion } from '../models/opcion';
import { Situacion } from '../models/situacion';
import { Rango } from '../models/rango';

import { getConexionBackend } from '../utils/constants';
import { RespuestasSeccion } from '../models/respuestas_seccion';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  service: string[] = [
    'test',
    'seccion',
    'situacion',
    'pregunta',
    'opcion',
    'rango',
    'gestion_test',
  ];

  BASE_URL: string | undefined;

  constructor(private http: HttpClient) {}

  ///test/<int:id_test>

  postResponse(
    sendResponse: RespuestasSeccion[],
    id_usuario: number
  ): Observable<RespuestasSeccion> {
    const url = getConexionBackend(this.service[6]);
    return this.http.post(
      `${url}/realizar_test/${id_usuario}`,
      sendResponse
    ) as Observable<RespuestasSeccion>;
  }

  getTestsAdmin(): Observable<Test[]> {
    const url = getConexionBackend('administrar');
    return this.http.get<Test[]>(`${url}/enviar/test`);
  }

  getTests(): Observable<Test[]> {
    const url = getConexionBackend(this.service[0]);
    return this.http.get<Test[]>(`${url}/listar`);
  }

  getOpcionesByIdTest(id: number): Observable<Opcion[]> {
    const url = getConexionBackend(this.service[4]);
    return this.http.get<Opcion[]>(`${url}/test/${id}`);
  }

  getRangosByIdTest(id: number): Observable<Rango> {
    const url = getConexionBackend(this.service[5]);
    return this.http.get<Rango>(`${url}/test/${id}`);
  }

  getTestById(id: number): Observable<Test> {
    const url = getConexionBackend(this.service[0]);
    return this.http.get<Test>(`${url}/${id}`);
  }

  getAllSeccionByTestId(id: number): Observable<Seccion[]> {
    const url = getConexionBackend(this.service[1]);
    return this.http.get<Seccion[]>(`${url}/test/${id}`);
  }

  getAllSituacionBySeccionId(id: number): Observable<Situacion[]> {
    const url = getConexionBackend(this.service[2]);
    return this.http.get<Situacion[]>(`${url}/seccion/${id}`);
  }

  geetAllPreguntaBySituacionId(id: number): Observable<Pregunta[]> {
    const url = getConexionBackend(this.service[3]);
    return this.http.get<Pregunta[]>(`${url}/situacion/${id}`);
  }
}
