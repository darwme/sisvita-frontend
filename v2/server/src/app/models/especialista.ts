import { Persona } from './persona';

export interface Especialista {
  id_especialista: number;
  codigo_especialista: string;
  especialidad: string;
  experiencia: number;
  persona: Persona;
}
