import { Usuario } from './usuario';
import { Test } from './test'

export interface Historial {
  usuario?: Usuario;
  test: Test;
  fecha_realizada: Date;
  puntajes: string;
  diagnosticos: string;
}
