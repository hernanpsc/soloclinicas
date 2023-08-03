import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Clinicas } from '../../../interfaces/clinicas';
import { ClinicasService } from '../../../servicios/clinicas.service';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';


@Component({
  selector: 'app-clinicas-list',
  templateUrl: './clinicas-list.component.html',
  styleUrls: [ './clinicas-list.component.css']  
})
export class ClinicasListComponent implements OnInit {
  clinicas$: Observable<Clinicas[]> = new Observable();
  public search: string = '';

  clinicaDialog: boolean = false;

  addClinicaDialog: boolean = false;

  deleteClinicaDialog: boolean = false;

  deleteClinicasDialog: boolean = false;

  clinicas: Clinicas[] = [];

  clinica: Clinicas = {};

  selectedClinicas: Clinicas[] = [];

  submitted: boolean = false;

  columns: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private clinicasService: ClinicasService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.fetchClinicas();

    this.columns = [
        { field: '_id', header: 'ID' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'tipo', header: 'Tipo' },
        { field: 'ubicacion.barrio', header: 'Localidad' },
        { field: 'ubicacion.region', header: 'Región' },
        { field: 'rating', header: 'Reviews' },
    ];  


  }
  private fetchClinicas(): void {
    this.clinicasService.getClinicas().subscribe({
      next: (clinicas: Clinicas[]) => {
        this.clinicas = clinicas;
      },
      error: (error: any) => {
        console.error('Error al obtener las clínicas:', error);
      }
    });
  }

  onClinicaSelect() {console.log('Hola')
  }
  

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.clinicas.length; i++) {
        if (this.clinicas[i]._id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}



openNewClinica() {
    this.submitted = false;
    this.addClinicaDialog = true;
}


deleteSelectedClinicas() {
    this.deleteClinicasDialog = true;
}

editClinica(clinica: Clinicas) {
    this.clinica = { ...clinica };
    this.clinicaDialog = true;
}

deleteClinica(clinica: Clinicas) {
    this.deleteClinicaDialog = true;
    this.clinica = { ...clinica };
}

confirmDeleteSelectedClinica() {
    this.deleteClinicasDialog = false;
    const idsToDelete: string[] = [];
    // Iterar sobre los objetos en selectedClinicas
  this.selectedClinicas.forEach(clinica => {
    // Verificar que el objeto tenga un ID válido antes de agregarlo a idsToDelete
    if (clinica._id) {
      idsToDelete.push(clinica._id);
    }
  });
    idsToDelete.forEach(id => {
        this.clinicasService.deleteClinica(id).subscribe({
          next: () => this.fetchClinicas(),
          error: (error: any) => {
            console.error(`Falló eliminar clinica: ID ${id}`, error);
          }
        });
      });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clinicas Borrada', life: 3000 });
    this.selectedClinicas = [];
}

confirmDeleteClinica(id: string): void {
  // Obtener el nombre de la clínica antes de eliminarla
  const clinica = this.clinicas.find(c => c._id === id);
  const clinicaNombre = clinica ? clinica.nombre : 'Clínica'; // Si no se encuentra la clínica, se asigna un valor por defecto

  this.deleteClinicaDialog = false;
  this.clinicasService.deleteClinica(id).subscribe({
    next: () => {
      this.fetchClinicas(); // Actualizar la lista de clínicas después de la eliminación

      // Mostrar mensaje con el nombre de la clínica eliminada
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: `${clinicaNombre} eliminada `,
        life: 3000
      });
    },
    error: (error) => {
      console.error(error);
    }
  });
}


hideDialogClinica() {
    this.clinicaDialog = false;
    this.addClinicaDialog = false;
    this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Formulario cancelado.', life: 3000 });
    this.submitted = false;
}

hideModalClinica() {
  this.clinicaDialog = false;
  this.addClinicaDialog = false;
  this.submitted = false;
}



closeModal() {
  this.clinicaDialog = false;
}

clinicaEditdaHandler(clinica: Clinicas) {
  // Realiza la acción que necesites con la clínica editada
  const clinicaActualizada = this.clinicas.find(c => c._id === clinica._id);

  if (!clinicaActualizada) {
    console.error('La clínica no existe en el array de clínicas.');
    return;
  }

  const clinicaNombre = clinicaActualizada.nombre;

  this.clinicaDialog = false;

  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `¡${clinicaNombre} se editó correctamente!`, life: 3000 });
  // console.log('Clínica editada:', clinica);
  // Otras acciones...
}


clinicaAgregadaHandler(clinica: Clinicas) {
  // Realiza la acción que necesites con la clínica agregada
  this.clinicas.push(clinica);
  this.addClinicaDialog = false;

  const clinicaAgregada = this.clinicas.find(c => c._id === clinica._id);

  if (clinicaAgregada) {
    const clinicaNombre = clinicaAgregada.nombre;

    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `¡${clinicaNombre} se agrogó exitosamente!`, life: 3000 });
  }

  // console.log('Clínica agregada:', clinica);
  // Otras acciones...
}



}

