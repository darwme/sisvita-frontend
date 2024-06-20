import { Pregunta } from './pregunta';
import { Historial } from './historial';

export interface Resultado {
  opcion_elegida: string;
  puntaje: number;
  pregunta: Pregunta;
  historial: Historial;
}
