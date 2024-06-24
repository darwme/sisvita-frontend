export interface Distrito {
  nombre: string;
  ubigeo: string;
  y: number;
  x: number;
}

export interface Ubicacion {
  nombre: string;
  distritos: Distrito[];
}
