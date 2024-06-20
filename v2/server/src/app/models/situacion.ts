import { Seccion } from './seccion';

export interface Situacion {
  descripcion: string;
  cant_preguntas: number;
  seccion: Seccion;
}
