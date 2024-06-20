import { z } from 'zod';
import { Persona } from '../model/persona';
import { pacienteSchema } from './paciente';

export const personaSchema = z.object({
  id_persona: z.number({
    invalid_type_error: 'El id de la persona debe ser un número',
  }),
  nombres: z.string({
    invalid_type_error: 'El nombre de la persona debe ser un string',
  }),
  apellidos: z.string({
    invalid_type_error: 'El apellido de la persona debe ser un string',
  }),
  fecha_nacimiento: z.date({
    invalid_type_error:
      'La fecha de nacimiento de la persona debe ser un string',
  }),
  sexo: z.enum(['masculino', 'femenino'], {
    invalid_type_error: 'El sexo de la persona debe ser un string',
  }),
  estado_civil: z.enum(['soltero', 'casado', 'divorciado', 'viudo'], {
    invalid_type_error: 'El estado civil de la persona debe ser un string',
  }),
  tipo_persona: z.enum(['estudiante', 'epsecialista'], {
    invalid_type_error: 'El tipo de persona debe ser un string',
  }),
  paciente: pacienteSchema,
});

export function validatePersona(input: unknown) {
  return personaSchema.safeParse(input);
}

export function validatePartialPersona(input: unknown) {
  return personaSchema.partial().safeParse(input);
}

export function validateAllPersonas(input: unknown) {
  return z.array(personaSchema).safeParse(input);
}
