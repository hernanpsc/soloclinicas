import { Imagen as MiImagen } from './interfaces';

export interface Planes {
    price?: string;
    precio?: string;
    rating?: '1' | '2' | '3'| '4' | '5';
    copagos?: string;
    category?: 'inferior' | 'intermedio' | 'superior';
    tags?: string[];
    hijosSolos?: string;
    name?: string;
    images?:MiImagen[];
    imagenes?: string[] | undefined;
    folletos?:string[];
    beneficios?:string[];
    clinicas?:string[];
    _id?: string;
    item_id?: string;
  empresa?: string;
  sigla?: string; 
  linea?: string; 
  }
  
  

