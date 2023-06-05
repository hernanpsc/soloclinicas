import { Ubicacion as MiUbicacion, Imagen as MiImagen } from './interfaces';


export interface Clinicas {
  _id?: string;
  item_id?: string;
  nombre?: string; // Asegúrate de que la propiedad "nombre" esté definida sin el signo de interrogación (?)
  entity?: string;
  ubicacion?: MiUbicacion;
  url?: string;
  imagen?: MiImagen[];
  tipo?: string;
  especialidades?: string[];
  cartillas?: string[];
  coberturas?: string[];
}

  