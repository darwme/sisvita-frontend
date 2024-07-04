import { Paciente } from './paciente';
import { Especialista } from './especialista';
import { Time } from '@angular/common';

export enum Estado {
  pendiente = 'pendiente',
  realizada = 'realizada',
  cancelada = 'cancelada',
}

export interface EspecialistaCita {
  id_especialista:number,
  codigo_especialista: string,
  nombres: string,
  apellidos: string,
  especialidad: string,
  experiencia: string,

}

export interface PacienteCita {
  id_paciente: number;
  codigo_paciente: string;
  nombres: string;
  apellidos: string;
  sexo: string;
  fecha_nacimiento: Date;
  celular: string,
  antecedentes:string;
}


export interface Cita {
  motivo: string;
  fecha_agenda: Date;
  estado: Estado;
  especialista: EspecialistaCita;
  paciente: PacienteCita;
}

