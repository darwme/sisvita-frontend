export interface seccionb {
  id_seccion: number;
  respuestas: number[];
}

export interface Response {
  id_test: number;
  secciones: seccionb[];
}
