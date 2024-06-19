import { Situacion } from './situacion';

export interface Pregunta {
  id_pregunta: number;
  descripcion: string;
  sitacion: Situacion;
}
