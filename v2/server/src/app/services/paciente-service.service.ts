import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../utils/constants';
import { Paciente } from '../models/paciente';
import { Test } from '../models/test';
import { Historial } from '../models/historial';

@Injectable({
  providedIn: 'root',
})
export class PacienteServiceService {

  service: string[] = [
    'test',
    'historial',
  ];

  BASE_URL: string | undefined;

  constructor() {}



}


