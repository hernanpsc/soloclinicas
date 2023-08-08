
import { Ubicacion as MiUbicacion, Imagen as MiImagen } from './interfaces';

export interface Empresa {
  _id?: string;
  item_id?:number,
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

export interface Imagen {
  url: string;
  descripcion: string;
}

export interface Ubicacion {
  calle_y_numero: string;
  telefono?: string;
  barrio: string;
  partido: string;
  region: string;
  provincia: string;
  CP: string;
}
