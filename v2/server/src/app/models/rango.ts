import { Test } from './test';

export interface Rango {
  id_rango: number;
  diagnostico: string;
  min: number;
  max: number;
  test: Test;
}
