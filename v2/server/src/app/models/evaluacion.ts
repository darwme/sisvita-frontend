// Especialista interface
export interface Especialista {
  especialidad: string;
  persona: Persona;
}

// Persona interface (para Especialista y Paciente)
export interface Persona {
  nombres: string;
  apellidos: string;
}

// HistorialTest interface
export interface HistorialTest {
  fecha_realizada: Date;
  diagnosticos: string;
  test_nombre: string;
}

// Paciente interface
export interface Paciente {
  persona: Persona;
}
  
// Evaluacion interface
export interface Evaluacion {
  comunicacion: string;
  descripcion_tratamiento: string;
  especialista: Especialista;
  fecha_evaluacion: Date;
  fundamento_cientifico: string;
  historial_test: HistorialTest;
  paciente: Paciente;
  tratamiento: string;
}
  