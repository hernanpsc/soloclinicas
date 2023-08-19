import { Component, Input,EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Planes } from '../../../interfaces/planes';
import { PlanesService } from '../../../servicios/planes.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']

})
export class EditPlanComponent implements OnInit {
  plan: BehaviorSubject<Planes> = new BehaviorSubject({});
  @Input() planId?: string;
  @Output() closeModal = new EventEmitter();
  @Output() editDialogClosed = new EventEmitter<void>();
  @Output() planEditado = new EventEmitter<Planes>();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planesService: PlanesService,
  ) { }

  ngOnInit() {
    const id = this.planId;

    if (!id) {
      alert('No hay id provisto');
      return;
    }

    this.planesService.getPlan(id !).subscribe((plan) => {
      this.plan.next(plan);
    });
  }

  editPlan(plan: Planes) {
    if (!plan._id) {
      console.error('El ID de la clínica es nulo o indefinido. No se puede actualizar la clínica.');
      return;
    }
    // Eliminar el campo _id del objeto plan antes de enviarlo al servicio de actualización
    const { _id, ...updatedPlan } = plan;
  
    this.planesService.updatePlan(plan._id || '', updatedPlan)
      .subscribe({
        next: () => {
// Emitir el evento empresaEditada con la clínica actualizada
this.planEditado.emit(plan);
          console.log('Evento closeModal emitido'); // Verificar si se emite el evento
        },
        error: (error) => {
          alert('Falló actualizar clínica');
          console.error(error);
        }
      });
      this.editDialogClosed.emit();
  }
  cancelarDialogo(){
    this.closeModal.emit();
  }

 
}


