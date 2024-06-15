import { z } from 'zod';
import { Estudiante } from '../model/estudiante';
import { personaSchema } from './persona';

export const estudianteSchema = z.object({
  id_estudiante: z.number({
    invalid_type_error: 'El id del estudiante debe ser un número',
  }),
  codigo: z.string({
    invalid_type_error: 'El código del estudiante debe ser un string',
  }),
  escuela: z.string({
    invalid_type_error: 'La escuela del estudiante debe ser un string',
  }),
  persona: personaSchema,
});

export function validateMovie(estudiante: Estudiante) {
  return estudianteSchema.safeParse(estudiante);
}

export function validatePartialMovie(estudiante: Partial<Estudiante>) {
  return estudianteSchema.partial().safeParse(estudiante);
}
