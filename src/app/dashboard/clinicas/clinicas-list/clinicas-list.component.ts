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
    this.clinica = {};
    this.submitted = false;
    this.clinicaDialog = true;
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
    this.deleteClinicaDialog = false;
    this.clinicasService.deleteClinica(id).subscribe({next: () => this.fetchClinicas()});
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clinica Eliminada', life: 3000 });
    this.clinica = {};
}

hideDialogClinica() {
    this.clinicaDialog = false;
    this.submitted = false;
}

saveClinica() {
    this.submitted = true;

    if (this.clinica.nombre?.trim()) {
        if (this.clinica._id) {
            // @ts-ignore
            this.clinicas[this.findIndexById(this.clinica._id)] = this.clinica;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto Actualizado', life: 3000 });
        } else {
            this.clinica._id = this.createId();
            // @ts-ignore
            this.clinicas.push(this.clinica);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clinica Creada', life: 3000 });
        }

        this.clinicas = [...this.clinicas];
        this.clinicaDialog = false;
        this.clinica = {};
    }
}

closeModal() {
  this.clinicaDialog = false;
}
}
