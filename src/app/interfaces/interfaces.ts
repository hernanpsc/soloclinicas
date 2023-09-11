export interface Imagen {
    id?: string;
    url?: string;
    descripcion?: string;
    empresa?:string
  }
  
  export interface Ubicacion {
    calle_y_numero?: string;
    telefono?: string;
    barrio?: string;
    partido?: string;
    region?: string;
    provincia?: string;
    CP?: string;
  }
  
  export interface Content {
    text: string;
    descripcion: string;
  }

  export interface Item {
    label: string;
    icon?: string;
    items?: Item[][];
  }

  export interface PlanSeleccionado {
    label: string;
    key: string;
  }

  export interface Attribute {
    id: string;
    name?: string;
    value_id?: Item[][];
    value_name?:string;
    attribute_group_id: string;
    attribute_group_name:string;
    value_type: string;
  }