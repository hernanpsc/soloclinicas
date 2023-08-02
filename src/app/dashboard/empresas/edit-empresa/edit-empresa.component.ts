import { Component, Input,EventEmitter, Output,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../../../interfaces/empresas';
import { EmpresasService } from '../../../servicios/empresas.service';

@Component({
  selector: 'app-edit-empresa.component.ts',
  templateUrl: 'edit-empresa.component.html',
  styleUrls: ['edit-empresa.component.css'],
})
export class EditEmpresaComponent implements OnInit {
  empresa: BehaviorSubject<Empresa> = new BehaviorSubject({});
  @Input() empresaId?: string;
  @Output() closeModal = new EventEmitter();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empresasService: EmpresasService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('id No Provisto');
    }

    this.empresasService.getEmpresa(id !).subscribe((empresa) => {
      this.empresa.next(empresa);
    });
  }

  editEmpresa(empresa: Empresa) {
    this.empresasService.updateEmpresa(this.empresa.value._id || '', empresa)
      .subscribe({
        next: () => {
          this.router.navigate(['/empresas']);
        },
        error: (error) => {
          alert('Falló actualizar empresa');
          console.error(error);
        }
      })
  }
}
