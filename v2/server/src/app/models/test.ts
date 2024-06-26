import { Opcion } from './opcion';
import { Seccion } from './seccion';

export interface Test {
  descripcion: string;
  id_test: number;
  nombre: string;
  secciones: Seccion[];
  opciones: Opcion[];
}
