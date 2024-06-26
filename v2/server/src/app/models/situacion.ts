import { Pregunta } from './pregunta';

export interface Situacion {
  descripcion: string;
  id_seccion: number;
  id_situacion: number;
  preguntas: Pregunta[];
}
