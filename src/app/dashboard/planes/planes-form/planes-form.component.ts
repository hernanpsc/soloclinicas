import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl,NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Planes } from '../../../interfaces/planes';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PlanesService } from '../../../servicios/planes.service';
import { EmpresasService } from '../../../servicios/empresas.service';

import { SelectItem } from 'primeng/api';
import { SERVER_URL } from '../../../constants';

@Component({
  selector: 'app-planes-form',
  templateUrl: './planes-form.component.html',
  styleUrls: ['./planes-form.component.css']
})
export class PlanesFormComponent implements OnInit {
  @Input() initialState: BehaviorSubject<Planes> = new BehaviorSubject({});
  @Output() formValuesChanged = new EventEmitter<Planes>();
  @Output() formSubmitted = new EventEmitter<Planes>();
  @Output() cancelDialog = new EventEmitter<void>();
  @Input() buttonText: string = 'Guardar';
  isEditMode: boolean = false;
  planForm: FormGroup = new FormGroup({});
  serverUrl = SERVER_URL;

  generatedItemIDs: number[] = [];
  generated_ids: string[] = [];

  private fileTmp: any;
  displayUploadDialog: boolean = false;
  imageUploadForm: FormGroup;
  selectedFile: File | null = null;

  attributeGroup: FormGroup = new FormGroup({});

  valSwitch: boolean = false;
  selectedDrop: SelectItem = { value: '' };
  categorias: SelectItem[] = [];
  selectedTags: any[] = [];

  onTagsChange(event: any) {
    // Actualiza el arreglo de etiquetas seleccionadas cuando cambia
    this.selectedTags = event;
  }
  constructor(private fb: FormBuilder, private http: HttpClient, private planesService: PlanesService, private empresasService: EmpresasService) {
    this.attributeGroup = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
    });
    this.imageUploadForm = this.fb.group({
      image: [null, Validators.required],
      description: [''],
    });
  
  }
  
 
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
  get images() {return this.planForm.controls["images"] as FormArray;}
  get attributes() {return this.planForm.controls["attributes"] as FormArray;}
  ngOnInit() {

  this.planesService.getPlanes().pipe(
    map((planes: any[]) => {
      this.generatedItemIDs = planes.map(plan => plan.item_id);
    })
  ).subscribe();
  this.planesService.getPlanes().pipe(
    map((planes: any[]) => {
      this.generated_ids = planes.map(plan => plan._id);
    })
  ).subscribe(); 

    let plan: Planes; // Declara la variable plan aquí
    this.initialState.subscribe((receivedPlan) => {
      plan = receivedPlan; // Asigna el valor recibido a la variable plan
    
  console.log(plan._id)
      const folletosArray = this.fb.array([]);
      if (Array.isArray(plan.folleto)) {
        plan.folleto.forEach(folleto => folletosArray.push(this.fb.control(folleto)));
      }
      if (plan) { // Verifica si plan y plan._id existen

        this.isEditMode = true; // Estás en modo de edición        
        this.planForm = this.fb.group({
          _id: [plan._id], // generar id
          item_id: [plan.item_id],
          name: [plan.name],
          hijosSolos: [plan.hijosSolos], // boolean tomado del formulario
          clinicas: this.fb.array(plan.clinicas || []), // FormArray para clínicas
          copagos: [plan.copagos],
          Sin_Copagos: [plan.Sin_Copagos], // boolean tomado del formulario
          empresa: [plan.empresa], // valor tomado del formulario
          sigla: [plan.sigla],// buscar sigla de la empresa "sigla"
          price: [plan.price],
          precio: [plan.precio],
          rating: [plan.rating],
          category: [plan.category],
          beneficios: this.fb.array(plan.beneficios || []), // FormArray para beneficios
          tags: this.fb.array(plan.tags || []), // FormArray para tags
          folleto: this.fb.array(plan.folleto || []), // FormArray para folletos
          images: this.fb.array(plan.images || []), // FormArray para imágenes
          attributes: this.fb.array(plan.attributes || []), // FormArray para atributos
          Cirugia_Estetica: [plan.Cirugia_Estetica],
          Cobertura_Nacional: [plan.Cobertura_Nacional],
          Habitacion_Individual: [plan.Habitacion_Individual],
          Ortodoncia_Adultos: [plan.Ortodoncia_Adultos],
          PMO_Solo_por_Aportes: [plan.PMO_Solo_por_Aportes],
          valueSlide3: [plan.valueSlide3],
          valueSlide4: [plan.valueSlide4],
          linea:[plan.linea]

          
        }); 
        if (plan.attributes && plan.attributes.length > 0) {
          const attributeControls = plan.attributes.map(attribute => this.fb.group({
            id: [attribute.id],
          name: [attribute.name]
          }));
          const attributeFormArray = this.planForm.get('attributes') as FormArray;
          attributeControls.forEach(control => attributeFormArray.push(control));
        }
    
        if (plan.images && plan.images.length > 0) {
          const imagesControls = plan.images.map(imagen => {
            return this.fb.group({
              id: [imagen.url],
              name: [imagen.descripcion]
            });
          });
          const imagesFormArray = this.planForm.get('images') as FormArray;
          imagesControls.forEach(control => imagesFormArray.push(control));
        }
        console.log(plan._id)
        this.planForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });

        
      }})
      

    this.categorias = [
      { label: 'Inicial', value: { id: 1, name: 'Inicial', code: 'INI' } },
      { label: 'Intermedio', value: { id: 2, name: 'Intermedio', code: 'INT' } },
      { label: 'Superior', value: { id: 3, name: 'Superior', code: 'SUP' } },
      { label: 'Premium', value: { id: 4, name: 'Premium', code: 'PRE' } },
  ];
  
   
  }
  
  addNewAttribute(){
    
    this.attributes.push(this.attributeGroup);
  }
  

  submitForm() {
    console.log(this.planForm.value);
    if (this.planForm.valid) { // Verificar si el formulario es válido antes de continuar
      const formValue = this.planForm.value;
      if (this.isEditMode) {
        console.log('Datos de plan editados:', formValue);
      } else {
        // Acciones para agregar nueva empresa
  
        const new_id = this.generate_id(24);
        const empresa = this.planForm.get('empresa')?.value; // valor tomado del formulario
        const name = this.planForm.get('name')?.value; // Obtener el valor del campo 'name'
        const newItem_id = this.generateItem_Id(empresa, name); // id generado con función
        const hijosSolos = this.planForm.get('hijosSolos')?.value; // boolean tomado del formulario
        const clinicas = this.planForm.get('clinicas')?.value; // Obtener el valor del campo 'clinicas' no se modifican en el formulario este
        const copagos = this.planForm.get('copagos')?.value; // boolean tomado del formulario
        const Sin_Copagos = this.planForm.get('Sin_copagos')?.value; // boolean tomado del formulario
        const sigla = this.findSiglaEmpresa(empresa); // buscar sigla de la empresa "sigla"
        const price = this.planForm.get('price')?.value; // Obtener el valor del campo 'name'
        const precio = this.planForm.get('precio')?.value; // Obtener el valor del campo 'name'
        const rating = this.planForm.get('rating')?.value; // Obtener el valor del campo 'name'
        const category = this.planForm.get('category')?.value; // Obtener el valor del campo 'name'
        // const beneficio = this.planForm.get('beneficios')?.value; // Obtener el valor del campo 'name'
        const folleto = this.planForm.get('folleto')?.value; // Obtener el valor del campo 'name'
        const images = this.planForm.get('images')?.value;
        const attributes = this.planForm.get('attributes')?.value;
        const Cirugia_Estetica = this.planForm.get('Cirugia_Estetica')?.value;
        const Cobertura_Nacional = this.planForm.get('Cobertura_Nacional')?.value;
        const Habitacion_Individual = this.planForm.get('Habitacion_Individual')?.value;
        const Ortodoncia_Adultos = this.planForm.get('Ortodoncia_Adultos')?.value;
        const PMO_Solo_por_Aportes = this.planForm.get('PMO_Solo_por_Aportes')?.value;
        const valueSlide3 = this.planForm.get('valueSlide3')?.value;
        const valueSlide4 = this.planForm.get('valueSlide4')?.value;
        const linea = this.planForm.get('linea')?.value;
  
        const findSiglaEmpresa = this.findSiglaEmpresa(empresa);
        this.planForm.patchValue({ _id: new_id });
        this.planForm.patchValue({ item_id: newItem_id });
  
        this.planForm.patchValue({ sigla: findSiglaEmpresa });
        this.processTags()
        
        const tags: string | null | undefined = this.planForm.get('tags')?.value;
        this.planForm.patchValue({ tags: tags });

        formValue.tags = tags;

        formValue.item_id = newItem_id;
        formValue._id = new_id;
       
        console.log('Nuevo plan a agregar:', formValue);
      }
  
      this.formSubmitted.emit(this.planForm.value);
    } else {
      // El formulario no es válido, muestra un mensaje de error o realiza las acciones necesarias.
      console.log('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }
  }
  
  cancelarDialogo() {
    // Emitir el evento de cancelar diálogo
    this.cancelDialog.emit();
  }

  // Función para procesar etiquetas
processTags() {
  if (this.planForm && this.planForm.valid) {
    // Procesa las etiquetas ingresadas aquí
    const tags = this.planForm.get('tags')?.value;
    console.log('Etiquetas ingresadas:')
    if (tags !== null && tags !== undefined) {

    const etiquetasArray = tags.split(',').map((etiqueta: string) => etiqueta.trim());
    console.log('Etiquetas ingresadas:', etiquetasArray);
    }
    // Aquí puedes realizar las acciones que desees con las etiquetas, como guardarlas en una variable o enviarlas al servidor.
  } else {
    // Maneja la validación del formulario
    console.log('El formulario no es válido. Por favor, completa todos los campos requeridos.');
  }
}


  
  
  getImages(plan: Planes): string[] | null {
    if (plan.images && plan.images.length > 0) {
      // Filtra las imágenes con URL válida
      const imageUrls = plan.images.filter((image: any) => image.url).map((image: any) => image.url);
      return imageUrls.length > 0 ? imageUrls : null;
    }
    return null;
  }


  findSiglaEmpresa(empresaName: string): Observable<string | undefined> {
    return this.empresasService.getSiglaEmpresa(empresaName).pipe(
      map(sigla => {
        if (sigla) {
          // Hacer algo con la sigla de la empresa
          console.log(`Sigla de la empresa: ${sigla}`);
          return sigla;
        } else {
          console.log('Empresa no encontrada o sin sigla');
          return undefined; // Devuelve undefined en caso de que no haya sigla
        }
      })
    );
  }
  

  generateItem_Id(empresaName: string, nombrePlan: string): string {
    let idGenerado = '';
    // Llama al servicio para obtener la sigla de la empresa
    this.empresasService.getSiglaEmpresa(empresaName).subscribe(sigla => {
      if (sigla) {
        // Asegúrate de que la sigla de la empresa y el nombre del plan no tengan espacios en blanco
        const siglaEmpresa = sigla.trim();
        const nombre = nombrePlan.trim();
  
        // Concatena la sigla de la empresa y el nombre del plan con un guion bajo
        idGenerado = `${siglaEmpresa}_${nombre}`;
        this.planesService.getPlanes().subscribe((planes: any[]) => {
          const existeItemID = planes.some(plan => plan.item_id === idGenerado);
  
          if (existeItemID) {
            console.error('Ya existe un plan con el mismo item_id.' + idGenerado);
            // Puedes usar el idGenerado aquí o emitirlo como resultado de una función, según tus necesidades

          }
        });
      } else {
        console.error('No se pudo obtener la sigla de la empresa.');
      }
    });
    return idGenerado;
  }
  

  generate_id(length: number): string {
    let number = '';
    for (let i = 0; i < length; i++) {
      const digit = Math.floor(Math.random() * 10);
      number += digit;
    }
  
    while (this.generated_ids.includes(number)) {
      number = ''; // Reinicia el número
      for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * 10);
        number += digit;
      }
    }
  
    this.generated_ids.push(number);
    return number;
  }
}



 

