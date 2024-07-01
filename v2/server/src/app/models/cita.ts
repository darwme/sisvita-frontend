import { Especialista } from './../../../../../v1/server/src/app/model/especialista';
import { Paciente } from './paciente';
import { Especialista } from './especialista';
import { Time } from '@angular/common';

export enum Estado {
  pendiente = 'pendiente',
  realizada = 'realizada',
  cancelada = 'cancelada',
}

export interface Especialista {
  nombres: string;
  apellidos: string,
}

export interface CitaPaciente {
  motivo: string;
  fecha_agenda: Date;
  estado: Estado;
  especialista: Especialista;
}

export interface CitaEspecialista {
  motivo: string;
  fecha_agenda: Date;
  hora: Time;
  estado: Estado;
  paciente: Paciente;
}

