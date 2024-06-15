import { z } from 'zod';
import { personaSchema } from './persona';
import { Especialista } from '../model/especialista';

export const especialistaSchema = z.object({
  id_especialista: z.number({
    invalid_type_error: 'El id del especialista debe ser un número',
  }),
  codigo: z.string({
    invalid_type_error: 'El código del especialista debe ser un string',
  }),
  especialidad: z.string({
    invalid_type_error: 'La especialidad del especialista debe ser un string',
  }),
  persona: personaSchema,
});

export function validateMovie(especialista: Especialista) {
  return especialistaSchema.safeParse(especialista);
}

export function validatePartialMovie(especialista: Partial<Especialista>) {
  return especialistaSchema.partial().safeParse(especialista);
}
