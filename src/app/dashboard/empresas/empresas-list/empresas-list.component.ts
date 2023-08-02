import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../../../interfaces/empresas';
import { EmpresasService } from '../../../servicios/empresas.service';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: [ './empresas-list.component.css']  
})
export class EmpresasListComponent implements OnInit {
  empresas$: Observable<Empresa[]> = new Observable();
  empresaDialog: boolean = false;
  submitted: boolean = false;

  constructor(private empresasService: EmpresasService) { }

  ngOnInit(): void {
    this.fetchEmpresas();
  }

  deleteEmpresa(id: string): void {
    this.empresasService.deleteEmpresa(id).subscribe({
      next: () => this.fetchEmpresas()
    });
  }

  hideDialogEmpresa() {
    this.empresaDialog = false;
    this.submitted = false;
}

  private fetchEmpresas(): void {
    this.empresas$ = this.empresasService.getEmpresas();
  }
}
