import { Component, Input,EventEmitter, Output,OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../../../interfaces/empresas';
import { EmpresasService } from '../../../servicios/empresas.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: 'edit-empresa.component.html',
  styleUrls: ['edit-empresa.component.css'],
})
export class EditEmpresaComponent implements OnInit {
  empresa: BehaviorSubject<Empresa> = new BehaviorSubject({});
  @Input() empresaId?: string;
  @Output() closeModal = new EventEmitter();
  @Output() editDialogClosed = new EventEmitter<void>();
  @Output() empresaEditada = new EventEmitter<Empresa>();


  constructor(
   
    private empresasService: EmpresasService,
  ) { }

  
  ngOnInit() {
    const id = this.empresaId;
    if (!id) {
      alert('ID no proporcionado');
      return;
    }
    this.empresasService.getEmpresa(id).subscribe((empresa) => {
      this.empresa.next(empresa);
    });
  }
  

  editEmpresa(empresa: Empresa) {
    if (!empresa._id) {
      console.error('El ID de la clínica es nulo o indefinido. No se puede actualizar la clínica.');
      return;
    }
    // Eliminar el campo _id del objeto empresa antes de enviarlo al servicio de actualización
    const { _id, ...updatedEmpresa } = empresa;
  
    this.empresasService.updateEmpresa(empresa._id || '', updatedEmpresa)
      .subscribe({
        next: () => {
// Emitir el evento empresaEditada con la clínica actualizada
this.empresaEditada.emit(empresa);
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
