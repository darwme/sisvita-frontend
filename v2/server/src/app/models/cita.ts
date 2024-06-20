import { Paciente } from './paciente';
import { Especialista } from './especialista';
import { Time } from '@angular/common';

export enum Estado {
  pendiente = 'pendiente',
  realizada = 'realizada',
  cancelada = 'cancelada',
}

export interface Cita {
  motivo: string;
  fecha_agenda: Date;
  hora: Time;
  estado: Estado;
  especialista: Especialista;
  paciente: Paciente;
}
