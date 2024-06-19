import { Test } from './test';

export interface Seccion {
  id_seccion: number;
  descripcion: string;
  cant_situaciones: number;
  test: Test;
}
