import { EventEmitter, Injectable,Output } from '@angular/core';
import { EventType } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeCompararService {
  compareList: any[] = [];
  @Output() servicioComparar: EventEmitter <any> = new EventEmitter;
  constructor() { }
}
