import { Ubicacion as MiUbicacion, Imagen as MiImagen } from './interfaces';


export interface Clinicas {
  _id?: string;
  item_id?: string;
  nombre?: string;
  entity?: string;
  ubicacion?: MiUbicacion;
  url?: string;
  imagen?: MiImagen[];
  tipo?: string;
  especialidades?: string[];
  cartillas?: string[];
  coberturas?: string[];
  rating?: number[]; 
  select?: boolean[]; 
}


  