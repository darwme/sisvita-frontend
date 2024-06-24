import { Usuario } from './usuario';

export enum Sexo {
  M = 'masculino',
  F = 'femenino',
}

export enum EstadoCivil {
  S = 'soltero',
  C = 'casado',
  D = 'divorciado',
  V = 'viudo',
}

export interface Persona {
  nombres: string;
  apellidos: string;
  fecha_nacimiento: Date;
  sexo: Sexo;
  estado_civil: EstadoCivil;
  celular: string;
  usuario: Usuario;
  ubigeo: string;
}
