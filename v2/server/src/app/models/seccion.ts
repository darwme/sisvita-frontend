import { Situacion } from './situacion';

export interface Seccion {
  descripcion: string;
  id_seccion: number;
  id_test: number;
  situaciones: Situacion[];
}
