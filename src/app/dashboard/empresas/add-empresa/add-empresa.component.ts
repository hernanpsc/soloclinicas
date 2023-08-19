import { Component, EventEmitter, Output } from '@angular/core';
import { Empresa } from '../../../interfaces/empresas';
import { EmpresasService } from '../../../servicios/empresas.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrls: ['./add.empresa.component.css'] 
})
export class AddEmpresaComponent {
  @Output() closeModal = new EventEmitter();
  @Output() empresaAgregada = new EventEmitter<Empresa>();
  
  constructor(
    private empresasService: EmpresasService
  ) { }

  addEmpresa(empresa: Empresa) {
    console.log(empresa._id)
    console.log(empresa.item_id)
    console.log(empresa.sigla)
    this.empresasService.createEmpresa(empresa).subscribe({
      next: () => {
        console.log('La clínica se agregó con éxito')
        //emite el evento para notificar al componente padre
        this.empresaAgregada.emit(empresa);
        // Restablecer el formulario u otras acciones necesarias después de agregar la clínica
        console.log('Evento closeModal emitido'); // Verificar si se emite el evento
      },
      error: (error) => {
        alert('Falló crear clínica');
        console.error(error);
      },
    });
  }
  cancelarDialogo(){
    this.closeModal.emit();
  }
}
