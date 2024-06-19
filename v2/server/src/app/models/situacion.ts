import { Seccion } from './seccion';

export interface Situacion {
  id_situacion: number;
  descripcion: string;
  cant_preguntas: number;
  seccion: Seccion;
}
