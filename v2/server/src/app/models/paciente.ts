import { Persona } from './persona';

export interface Paciente {
  id_paciente: number;
  codigo_paciente: string;
  antecedentes: string;
  persona: Persona;
}
