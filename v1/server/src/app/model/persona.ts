import { Paciente } from './paciente';

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

enum TipoPersona {
  E = 'estudiante',
  P = 'especialista',
}

export interface Persona {
  id_persona: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: Date;
  sexo: Sexo;
  estado_civil: EstadoCivil;
  tipo_persona: TipoPersona;
  paciente: Paciente;
}
