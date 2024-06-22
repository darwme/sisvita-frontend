import { Situacion } from './situacion';

export interface Seccion {
  id_seccion: number;
  descripcion: string;
  situaciones: Situacion[];
}
