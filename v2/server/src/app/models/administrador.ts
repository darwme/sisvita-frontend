import { Usuario } from './usuario';

export interface Administrador {
  id_administrador: number;
  nombre_administrador: string;
  usuario: Usuario;
}
