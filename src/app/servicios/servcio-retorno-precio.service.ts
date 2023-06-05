import {  EventEmitter, Injectable,Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServcioRetornoPrecioService {
  @Output() disparadorDePrecio: EventEmitter <any> = new EventEmitter;
  constructor() { }
}
