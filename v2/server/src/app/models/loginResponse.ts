export interface LoginResponse {
  data: {
    token: string;
    paciente: {
      antecedentes: string;
      codigo_paciente: string;
      id_paciente: number;
      persona: {
        apellidos: string;
        celular: string;
        estado_civil: string;
        fecha_nacimiento: string;
        id_persona: number;
        nombres: string;
        sexo: string;
        tipo_persona: string;
        ubicacion: {
          distrito: string;
          provincia: string;
          ubigeo: string;
          x: number;
          y: number;
        };
        usuario: {
          email: string;
          clave: string;
          id_usuario: number;
          tipo_usuario: string;
        };
      };
    };
  };
  message: string;
  status: number;
}
