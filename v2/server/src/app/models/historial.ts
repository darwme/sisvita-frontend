export interface Historial {
  codigo_historial_test: string;
  test: string;
  fecha_realizada: Date;
  puntajes: string;
  diagnosticos: string;
  secciones: string;
  estado: string;
}

export interface Historial_e {
  codigo_historial_test: string;
  codigo_paciente: string;
  paciente: string;
  test: string;
  fecha_realizada: Date;
  puntajes: string;
  diagnostico_general: string;
  diagnosticos: string;
  secciones: string;
  estado: string;
  ubicacion: {
    distrito: string;
    provincia: string;
    ubigeo: string;
    y: number;
    x: number;
  };
  rango_test: {
    minimo: number;
    maximo: number;
    diagnostico: string;
  };
}
