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
    
  formValuesChanged = new EventEmitter<Empresa>();

  @Output()
  formSubmitted = new EventEmitter<Empresa>();

  empresaForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }
  get name() { return this.empresaForm.get('name'); }
  
  
  

  

  ngOnInit() {
    this.initialState.subscribe(empresa => {
      this.empresaForm = this.fb.group({

        name: [ empresa.name ],
    
      });
    });

    this.empresaForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
 
  submitForm() {
    console.log(this.empresaForm.value)
    this.formSubmitted.emit(this.empresaForm.value);
  }
}
