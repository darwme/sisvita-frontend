import { Usuario } from './usuario';
import { Invitado } from './invitado';
import { Test } from './test';

export interface Historial {
  id_historial: number;
  fecha_historial: Date;
  puntaje: number;
  diagnostico: string;
  usuario?: Usuario;
  invitado?: Invitado;
  test: Test;
}
