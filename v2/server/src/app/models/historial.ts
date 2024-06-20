import { Usuario } from './usuario';

export interface Historial {
  usuario?: Usuario;
  test_realizado: string;
  fecha_realizado: Date;
  cantidad_preguntas_realizadas: number;
  puntaje_realizado: number;
  diagnostico: string;
}
