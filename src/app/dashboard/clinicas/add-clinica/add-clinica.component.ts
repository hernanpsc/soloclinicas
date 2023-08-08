import { Component, EventEmitter, Output } from '@angular/core';
import { Clinicas } from '../../../interfaces/clinicas';
import { ClinicasService } from '../../../servicios/clinicas.service';

@Component({
  selector: 'app-add-clinica',
  templateUrl: './add-clinica.component.html', 
  styleUrls: [ './add-clinica.component.css' ],
})
export class AddClinicaComponent {
    @Output() closeModal = new EventEmitter();
    @Output() clinicaAgregada = new EventEmitter<Clinicas>();
  constructor(
    private clinicasService: ClinicasService,
   
  ) { }

  ngOnInit(): void {


    
  }

  addClinica(clinica: Clinicas) {
    this.clinicasService.createClinica(clinica).subscribe({
      next: () => {
        // La clínica se agregó con éxito, emite el evento para notificar al componente padre
        this.clinicaAgregada.emit(clinica);
        // Restablecer el formulario u otras acciones necesarias después de agregar la clínica
        console.log('Evento closeModal emitido'); // Verificar si se emite el evento
      },
      error: (error) => {
        alert('Falló crear clínica');
        console.error(error);
      },
    });
  }
  
//   openNew() {
//     this.product = {};
//     this.submitted = false;
// }












   

// createId(): string {
//     let id = '';
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < 5; i++) {
//         id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
// }


cancelarDialogo(){
    this.closeModal.emit();
  }
}

