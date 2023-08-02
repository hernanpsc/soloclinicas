import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../../../interfaces/empresas';


@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: [ './empresas-form.component.css',  ]
})
export class EmpresasFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Empresa> = new BehaviorSubject({});
    @Output()
    @Input() buttonText: string = 'Guardar';

  formValuesChanged = new EventEmitter<Empresa>();

  @Output()
  formSubmitted = new EventEmitter<Empresa>();

  empresaForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }
  get item_id() { return this.empresaForm.get('item_id'); }
  get name() { return this.empresaForm.get('name'); }
  get ubicacion() { return this.empresaForm.get('ubicacion'); }
  get sucursales() { return this.empresaForm.get('sucursales'); }
  get planes() { return this.empresaForm.get('planes'); }
  get images() { return this.empresaForm.get('images'); }
  get sigla() { return this.empresaForm.get('sigla'); }
  get rating() { return this.empresaForm.get('rating'); }





  
  
  

  

  ngOnInit() {
    this.initialState.subscribe(empresa => {
      this.empresaForm = this.fb.group({

        item_id:[empresa.item_id],
name:[empresa.name],
ubicación:[empresa.ubicacion],
sucursales:[empresa.sucursales],
planes:[empresa.planes],
images:[empresa.images],
sigla:[empresa.sigla],
rating:[empresa.rating]

    
      });
    });

    this.empresaForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
 
  submitForm() {
    console.log(this.empresaForm.value)
    this.formSubmitted.emit(this.empresaForm.value);
  }
}
