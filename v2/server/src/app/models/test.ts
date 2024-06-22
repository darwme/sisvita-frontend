import { Opcion } from './opcion';
import { Seccion } from './seccion';

export interface Test {
  id_test: number;
  nombre: string;
  secciones: Seccion[];
  opciones: Opcion[];
}
