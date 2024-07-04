// model/interfaces.ts

// Usuario Interface
export interface Usuario {
    email: string;
}

// Ubicacion Interface
export interface Ubicacion {
    provincia: string;
    distrito: string;
}

// Persona Interface
export interface Persona {
    nombres: string;
    apellidos: string;
    fecha_nacimiento: Date; 
    sexo: 'masculino' | 'femenino'; 
    estado_civil: 'soltero' | 'casado' | 'divorciado' | 'viudo'; 
    celular: string;
    usuario: Usuario;
    ubicacion: Ubicacion;
}

// Especialista Interface
export interface Especialista {
    especialidad: string;
    experiencia: number;
    persona: Persona;
}

// Paciente Interface
export interface Paciente {
    antecedentes: string;
    persona: Persona;
}
