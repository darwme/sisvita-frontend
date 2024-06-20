import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../utils/constants';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteServiceService {
  constructor() {}
}
