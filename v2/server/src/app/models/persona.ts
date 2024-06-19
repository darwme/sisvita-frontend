import { Usuario } from './usuario';

enum Sexo {
  M = 'masculino',
  F = 'femenino',
}

enum EstadoCivil {
  S = 'soltero',
  C = 'casado',
  D = 'divorciado',
  V = 'viudo',
}

export interface Persona {
  id_persona: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: Date;
  sexo: Sexo;
  estado_civil: EstadoCivil;
  usuario: Usuario;
}
