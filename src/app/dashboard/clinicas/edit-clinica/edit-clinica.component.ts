import { Component, Input,EventEmitter, Output,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Clinicas } from '../../../interfaces/clinicas';
import { ClinicasService } from '../../../servicios/clinicas.service';

@Component({
  selector: 'app-edit-clinica',
  templateUrl: 'edit-clinica.component.html',
  styleUrls: ['edit-clinica.component.css'],
})
export class EditClinicaComponent implements OnInit {
  clinica: BehaviorSubject<Clinicas> = new BehaviorSubject({});
  @Input() clinicaId?: string;
  @Output() closeModal = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicasService: ClinicasService,
  ) { }

  ngOnInit() {
    const id = this.clinicaId;
    if (!id) {
      alert('ID no proporcionado');
      return;
    }
  
    this.clinicasService.getClinica(id).subscribe((clinica) => {
      this.clinica.next(clinica);
    });
  }
  
  editClinica(clinica: Clinicas) {
    if (!clinica._id) {
      console.error('El ID de la clínica es nulo o indefinido. No se puede actualizar la clínica.');
      return;
    }
  
    // Eliminar el campo _id del objeto clinica antes de enviarlo al servicio de actualización
    const { _id, ...updatedClinica } = clinica;
  
    this.clinicasService.updateClinica(clinica._id || '', updatedClinica)
      .subscribe({
        next: () => {
          this.router.navigate(['/clinicas']);
        },
        error: (error) => {
          alert('Falló actualizar clínica');
          console.error(error);
        }
      });
  
    this.closeModal.emit();
  }
  
  
  
  
  
  cancelarDialogo(){
    this.closeModal.emit();
  }
  
}
