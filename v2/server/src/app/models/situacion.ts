import { Pregunta } from './pregunta';

export interface Situacion {
  id_situacion: number;
  descripcion: string;
  preguntas: Pregunta[];
}
