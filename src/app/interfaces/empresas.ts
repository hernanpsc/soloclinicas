
import { Ubicacion as MiUbicacion, Imagen as MiImagen } from './interfaces';

export interface Empresa {
  _id?: string;
  item_id?:string,
  name?: string;
  planes?:[],
  lineas?:[],
  ubicacion?: MiUbicacion;
  sucursales?: MiUbicacion[];
  telefono?: string;
  images?: MiImagen[];
  sigla?:string,
rating?:number,
}
