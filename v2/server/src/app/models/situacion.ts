import { Pregunta } from './pregunta';

export interface Situacion {
  descripcion: string;
  preguntas: Pregunta[];
}
