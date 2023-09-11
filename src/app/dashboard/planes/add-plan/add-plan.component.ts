import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Planes } from '../../../interfaces/planes';
import { PlanesService } from '../../../servicios/planes.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: [ './add-plan.component.css']
})
export class AddPlanComponent {
  @Output() closeModal = new EventEmitter();
  @Output() planAgregado = new EventEmitter<Planes>();

  constructor(
    private router: Router,
    private planesService: PlanesService
  ) { }

  addPlan(plan: Planes) {
   
    this.planesService.createPlan(plan).subscribe({
      next: () => {
        console.log('La clínica se agregó con éxito')
        //emite el evento para notificar al componente padre
        this.planAgregado.emit(plan);
        // Restablecer el formulario u otras acciones necesarias después de agregar la clínica
        console.log('Evento closeModal emitido'); // Verificar si se emite el evento
      },
      error: (error) => {
        alert('Falló crear plan');
        console.error(error);
      },
    });
  }

  cancelarDialogo(){
    this.closeModal.emit();
  }
}
