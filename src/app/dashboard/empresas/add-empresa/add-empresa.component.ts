import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../../../interfaces/empresas';
import { EmpresasService } from '../../../servicios/empresas.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrls: ['./add.empresa.component.css'] 
})
export class AddEmpresaComponent {
  constructor(
    private router: Router,
    private empresasService: EmpresasService
  ) { }

  addEmpresa(empresa: Empresa) {
    this.empresasService.createEmpresa(empresa)
      .subscribe({
        next: () => {
          this.router.navigate(['/empresas']);
        },
        error: (error) => {
          alert("Falló crear empresa");
          console.error(error);
        }
      });
  }
}
