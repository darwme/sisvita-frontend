import { z } from 'zod';
import { Paciente } from '../model/paciente';

export const pacienteSchema = z.object({
  id_paciente: z.number({
    invalid_type_error: 'El id del paciente debe ser un número',
  }),
  email: z.string().email({
    message: 'El email debe ser válido',
  }),
  clave: z.string({
    invalid_type_error: 'La clave debe ser un string',
  }),
});

export function validatePaciente(paciente: Paciente) {
  return pacienteSchema.safeParse(paciente);
}

export function validatePartialPaciente(paciente: Partial<Paciente>) {
  return pacienteSchema.partial().safeParse(paciente);
}
