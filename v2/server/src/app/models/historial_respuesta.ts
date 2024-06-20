import { Historial } from './historial';
import { Respuesta } from './respuesta';

export interface HistorialRespuesta {
  historial: Historial;
  respuestas: Respuesta[];
}
