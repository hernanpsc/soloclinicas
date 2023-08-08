import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../../../interfaces/empresas';
import { EmpresasService } from '../../../servicios/empresas.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: [ './empresas-list.component.css']  
})
export class EmpresasListComponent implements OnInit {
  empresas$: Observable<Empresa[]> = new Observable();
  public search: string = '';

  empresaDialog: boolean = false;

  addEmpresaDialog: boolean = false;

  deleteEmpresaDialog: boolean = false;

  deleteEmpresasDialog: boolean = false;

  empresas: Empresa[] = [];

  empresa: Empresa = {
   
  };

  selectedEmpresas: Empresa[] = [];
  submitted: boolean = false;
  columns: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private empresasService: EmpresasService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.fetchEmpresas();
    this.columns = [
      { field: '_id', header: 'ID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'sigla', header: 'Nombre' },

  ];  
  }

  private fetchEmpresas(): void {
    this.empresasService.getEmpresas().subscribe({
      next: (empresas: Empresa[]) => {
        this.empresas = empresas;
        console.log(this.empresas)

      },
      error: (error: any) => {
        console.error('Error al obtener las empresas:', error);
      }
    });
  }
  
onEmpresaSelect() {console.log('Hola')
}

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.empresas.length; i++) {
        if (this.empresas[i]._id === id) {
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

openNewEmpresa() {
  this.submitted = false;
  this.addEmpresaDialog = true;
}

deleteSelectedEmpresas() {
  this.deleteEmpresasDialog = true;
}

editEmpresa(empresa: Empresa) {
  this.empresa = { ...empresa };
  this.empresaDialog = true;
}

deleteEmpresa(empresa: Empresa) {
  this.deleteEmpresaDialog = true;
  this.empresa = { ...empresa };
}

confirmDeleteSelectedEmpresa() {
  this.deleteEmpresasDialog = false;
  const idsToDelete: string[] = [];
this.selectedEmpresas.forEach(empresa => {
  if (empresa._id) {
    idsToDelete.push(empresa._id);
  }
});
  idsToDelete.forEach(id => {
      this.empresasService.deleteEmpresa(id).subscribe({
        next: () => this.fetchEmpresas(),
        error: (error: any) => {
          console.error(`Falló eliminar empresa: ID ${id}`, error);
        }
      });
    });
  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empresa Borrada', life: 3000 });
  this.selectedEmpresas = [];
}

confirmDeleteEmpresa(id: string): void {
// Obtener el nombre de la clínica antes de eliminarla
const empresa = this.empresas.find(c => c._id === id);
const empresaNombre = empresa ? empresa.name : 'Empresa'; // Si no se encuentra la clínica, se asigna un valor por defecto

this.deleteEmpresaDialog = false;
this.empresasService.deleteEmpresa(id).subscribe({
  next: () => {
    this.fetchEmpresas(); // Actualizar la lista de clínicas después de la eliminación

    // Mostrar mensaje con el nombre de la clínica eliminada
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: `${empresaNombre} eliminada `,
      life: 3000
    });
  },
  error: (error) => {
    console.error(error);
  }
});
}

hideDialogEmpresa() {
  this.empresaDialog = false;
  this.addEmpresaDialog = false;
  this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Formulario cancelado.', life: 3000 });
  this.submitted = false;
}

hideModalEmpresa() {
this.empresaDialog = false;
this.addEmpresaDialog = false;
this.submitted = false;
}

closeModal() {
this.empresaDialog = false;
}

empresaEditadaHandler(empresa: Empresa) {
// Realiza la acción que necesites con la clínica editada
const empresaActualizada = this.empresas.find(c => c._id === empresa._id);

if (!empresaActualizada) {
  console.error('La clínica no existe en el array de clínicas.');
  return;
}

const empresaNombre = empresaActualizada.name;

this.empresaDialog = false;

this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `¡${empresaNombre} se editó correctamente!`, life: 3000 });
// console.log('Empresa editada:', empresa);
// Otras acciones...
}


empresaAgregadaHandler(empresa: Empresa) {
// Realiza la acción que necesites con la clínica agregada
this.empresas.push(empresa);
this.addEmpresaDialog = false;

const empresaAgregada = this.empresas.find(c => c._id === empresa._id);

if (empresaAgregada) {
  const empresaNombre = empresaAgregada.name;

  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `¡${empresaNombre} se agrogó exitosamente!`, life: 3000 });
}
}}