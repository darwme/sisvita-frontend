import { Paciente } from './paciente';
import { Especialista } from './especialista';

enum Estado {
  pendiente = 'pendiente',
  realizada = 'realizada',
  cancelada = 'cancelada',
}

export interface Cita {
  id_cita: number;
  motivo: string;
  fecha_agenda: Date;
  hora: string;
  estado: Estado;
  especialista: Especialista;
  paciente: Paciente;
}
