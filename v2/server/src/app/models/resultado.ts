import { Pregunta } from './pregunta';
import { Historial } from './historial';

export interface Resultado {
  id_resultado: number;
  opcion_elegida: string;
  puntaje: number;
  pregunta: Pregunta;
  historial: Historial;
}
