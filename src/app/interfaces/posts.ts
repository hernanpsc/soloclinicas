import { Imagen as MiImagen, Content as MiContent  } from './interfaces';

export interface Post {
    _id?:string,
    title?:string,
    imagen?: MiImagen[],
    content?: MiContent[]
}
