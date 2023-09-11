import { Imagen as MiImagen } from './interfaces';
import { Attribute as Attribute } from './interfaces';


export interface Planes {
  _id?: string;
  item_id?: string;
  copagos?: boolean;
  category?: string;
  tags?: string[];
  hijosSolos?: boolean;
  name?: string;
  empresa?: string;
  sigla?: string;
  folleto?: string[];
  images?: MiImagen[];
  beneficios?: string[];
  clinicas?: string[];
  price?: number;
  rating?: number;
  attributes?: Attribute[];
  Cirugia_Estetica?: boolean;
  Cobertura_Nacional?: boolean;
  Habitacion_Individual?: boolean;
  Ortodoncia_Adultos?: boolean;
  PMO_Solo_por_Aportes?: boolean;
  Sin_Copagos?: boolean;
  precio?: number;
  valueSlide3?: number;
  valueSlide4?: number;
  linea?: string;
}





