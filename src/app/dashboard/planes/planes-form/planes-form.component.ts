import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Planes } from '../../../interfaces/planes';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-planes-form',
  templateUrl: './planes-form.component.html',
  styleUrls: [ './planes-form.component.css',  ]
})
export class PlanesFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Planes> = new BehaviorSubject({});
    @Output()formValuesChanged = new EventEmitter<Planes>();

  @Output()
  formSubmitted = new EventEmitter<Planes>();

  planForm: FormGroup = new FormGroup({});
  valSwitch: boolean = false;
  selectedDrop: SelectItem = { value: '' };
  categorias: SelectItem[] = [];

  constructor(private fb: FormBuilder) { }
  get name() { return this.planForm.get('name'); }
  get price() { return this.planForm.get('price'); }
  get precio() { return this.planForm.get('precio'); }
  get rating() { return this.planForm.get('rating'); }
  get copagos() { return this.planForm.get('copagos'); }
  get category() { return this.planForm.get('category'); }
  
  get tags() { return this.planForm.get('tags'); }
  get hijosSolos() { return this.planForm.get('hijosSolos'); }
  get clinicas() { return this.planForm.get('clinicas'); }
  
  get folletos() { return this.planForm.get('folletos'); }
  get images() { return this.planForm.get('images'); }
  
  

  

  ngOnInit() {
    this.initialState.subscribe(plan => {
      this.planForm = this.fb.group({

        name: [ plan.name ],
        price: [ plan.price ],
        precio: [ plan.precio ],
        rating: [ plan.rating],
        copagos: [ plan.copagos],
        category: [ plan.category ],
        tags: [ plan.tags],
        hijosSolos: [ plan.hijosSolos],
        folletos: [ plan.folletos ],
        images: [ plan.images],
        clinicas: [ plan.clinicas],
      });
    });
    this.categorias = [
      { label: 'Inicial', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Intermedio', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'Superior', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Premium', value: { id: 4, name: 'Istanbul', code: 'IST' } },
  ];
    this.planForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
 
  submitForm() {
    console.log(this.planForm.value)
    this.formSubmitted.emit(this.planForm.value);
  }
}
