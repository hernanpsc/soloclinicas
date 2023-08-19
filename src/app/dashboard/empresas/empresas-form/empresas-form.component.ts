import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl, AbstractControl  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../../../interfaces/empresas';
import { EmpresasService } from '../../../servicios/empresas.service';
import { map } from 'rxjs/operators';
import { SERVER_URL } from '../../../constants';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: [ './empresas-form.component.css',  ]
})

export class EmpresasFormComponent implements OnInit {
  @Input() initialState: BehaviorSubject<Empresa> = new BehaviorSubject({});
  @Output() formValuesChanged = new EventEmitter<Empresa>();
  @Output() formSubmitted = new EventEmitter<Empresa>();
  @Output() cancelDialog = new EventEmitter<void>();
  @Input() buttonText: string = 'Guardar';
  private fileTmp: any;
  empresaForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  displayUploadDialog: boolean = false;
  imageUploadForm: FormGroup;  
  selectedFile: File | null = null;
  generatedSiglas: string[] = [];
  generatedItemIDs: number[] = [];
  generated_ids: string[] = [];
  serverUrl = SERVER_URL;
  constructor(private fb: FormBuilder,private http: HttpClient,private empresasService: EmpresasService) {
    this.imageUploadForm = this.fb.group({
      image: [null, Validators.required],
      description: [''],
    });
  }

  get item_id() { return this.empresaForm.get('item_id'); }
  get _id() { return this.empresaForm.get('_id'); }
  get name() { return this.empresaForm.get('name'); }
  get images() {return this.empresaForm.get('images') as FormArray}  
  get sigla() { return this.empresaForm.get('sigla'); }
  get lineas() { return this.empresaForm.get('lineas'); }

  ngOnInit() {
  this.empresasService.getEmpresas().pipe(
    map((empresas: any[]) => {
      this.generatedSiglas = empresas.map(empresa => empresa.sigla);
    })
  ).subscribe();
  this.empresasService.getEmpresas().pipe(
    map((empresas: any[]) => {
      this.generatedItemIDs = empresas.map(empresa => empresa.item_id);
    })
  ).subscribe();
  this.empresasService.getEmpresas().pipe(
    map((empresas: any[]) => {
      this.generated_ids = empresas.map(empresa => empresa._id);
    })
  ).subscribe();  

  this.initialState.subscribe(empresa => {
  
    const imagesArray = this.fb.array([]);
    if (Array.isArray(empresa.images)) {
      empresa.images.forEach(image => imagesArray.push(this.fb.control(image)));
    }
    const lineasArray = this.fb.array([]);
    if (Array.isArray(empresa.lineas)) {
      empresa.lineas.forEach((linea) => lineasArray.push(this.fb.control(linea)));
    }
    this.empresaForm = this.fb.group({
      _id: [ empresa._id ],
      name: [ empresa.name ],
      item_id: [ empresa.item_id],
      images: imagesArray,
      sigla: [ empresa.sigla],
      lineas: [ empresa.lineas ],
    });
    if (empresa._id) { // Verificar si initialState está vacío (null)
      this.isEditMode = true;
    } 
console.log(empresa._id)

    this.empresaForm.valueChanges.subscribe((val) => { 
      this.formValuesChanged.emit(val); 
    });
  });
}

submitForm() {
  console.log(this.empresaForm.value);
  const formValue = this.empresaForm.value;

  // Realizar acciones según el contexto (agregar o editar)
  if (this.isEditMode == true) {
    // Acciones para editar empresa
    // ...
   

    console.log('Datos de empresa editados:', formValue);
  } else {
    // Acciones para agregar nueva empresa
    const name = this.empresaForm.get('name')?.value; // Obtener el valor del campo 'name'
    const newSigla = this.generateSigla(name); // Generar el nuevo "item_id"
    const newItem_id = this.generateItem_Id()
    const new_id = this.generate_id(24)
    const lineasValue = this.empresaForm.get('lineas')?.value;
    const lineasArray = ['']
    if(lineasValue){
      const lineasArray = lineasValue.split(',').map((value: string) => value.trim());  
    }
    // Aplicar el nuevo "item_id" al campo 'sigla'
    this.empresaForm.patchValue({ sigla: newSigla });
    this.empresaForm.patchValue({ item_id: newItem_id });
    this.empresaForm.patchValue({lineas: lineasArray });
    this.empresaForm.patchValue({_id: new_id });
    formValue.sigla = newSigla;
    formValue.item_id = newItem_id;
    formValue.lineas = lineasArray;
    formValue._id = new_id; 
     console.log('Nueva empresa agregada:', formValue);
  }
 
  // Emitir el evento de formulario enviado con los datos actualizados o agregados
  this.formSubmitted.emit(this.empresaForm.value);
}

  cancelarDialogo() {
    // Emitir el evento de cancelar diálogo
    this.cancelDialog.emit();
  }

  openUploadImageDialog() {
    this.displayUploadDialog = true;
  }
  
  onSubmitUpload() {
    // const imageFile = this.imageUploadForm.get('image')?.value;
    // const description = this.imageUploadForm.get('description')?.value;
    // Realizar acciones con la imagen cargada, como subirla al servidor
      // Verificar si se seleccionó una imagen
  // if (!imageFile) {
  //   return;
  // }
   // Crear un objeto FormData para enviar el archivo al servidor
  //  const formData = new FormData();
  //  formData.append('image', imageFile);
  //  formData.append('description', description || '');
 // Enviar la imagen al servidor (asegúrate de cambiar la URL por la ruta correcta en tu backend)
//  this.http.post('/assets/images/card-header', formData).subscribe(
//   (response) => {
    // La imagen se cargó exitosamente en el servidor, realiza las acciones necesarias
  //   console.log('Imagen cargada con éxito', response);
  //   this.cancelUpload();
  // },
  // (error) => {
  //   console.error('Error al cargar la imagen', error);
  // }
// ); 
  }

  
  cancelUpload() {
    this.imageUploadForm.reset();
    this.displayUploadDialog = false;
  }

  onImageSelected(event: Event) {
    console.log('event onImageSelected  :' +event)
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const imageFile = inputElement.files[0];
      // Realiza aquí la lógica para cargar el archivo al servidor y obtener el nombre único
      // ...

      // Por ejemplo, supongamos que ya obtuviste el nombre único como uniqueFilename
      // const imageUrl = `http://tu-servidor.com/images/${uniqueFilename}`;s

      // Agregar la URL al array images de la empresa
      // this.empresa.images.push(imageUrl);
    }
  }
  getFile($event:any){
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName:file.name
    } 
  } 

  sendFile(): void {
    const body = new FormData();
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);

    this.empresasService.sendPost(body).subscribe((res) => {
      const imageUrl = res.data.url;

      // Agregar la URL al array de imágenes en la posición 0
      this.images.insert(0, this.fb.control(imageUrl));
    });
    this.displayUploadDialog = false;
  }
  onUpload() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
console.log(this.selectedFile.name)
    this.http.post<any>(this.serverUrl, formData).subscribe(
      response => {
        console.log('Imagen cargada correctamente');
        // Aquí puedes actualizar el array images[] con la URL de la imagen cargada en el servidor
      },
      error => {
        console.error('Error al cargar la imagen:', error);
      }
    );
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  generateSigla(name: string) {
  const words = name.trim().split(/\s+/);
  console.log(name)
  let itemID = '';
  
  if (words.length >= 2) {
    itemID = words.map(word => word.charAt(0).toUpperCase()).join('');
  } else if (words.length === 1) {
    itemID = words[0].slice(0, 2).toUpperCase();
  }
  
  let tempID = itemID;
  let counter = 1;
  
  // Verificar si ya existe un "item_id" similar en el array de "item_id" generados.
  while (this.generatedSiglas.includes(tempID)) {
    if (itemID.length === 2) {
      tempID = `${itemID}${counter}`;
    } else {
      tempID = itemID.slice(0, 3).toUpperCase() + counter;
    }
    counter++;
  }
  
  this.generatedSiglas.push(tempID);
  
  return tempID;
}

generateItem_Id(): number {
  let nextValue = 100; // Valor de inicio

  while (this.generatedItemIDs.includes(nextValue)) {
    nextValue += 100; // Incrementar en 100
  }

  return nextValue;
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



// generateLetterSegment(length: number): string {
//   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   let segment = '';
  
//   for (let i = 0; i < length; i++) {
//     const charIndex = Math.floor(Math.random() * chars.length);
//     segment += chars.charAt(charIndex);
//   }

//   return segment; // Agrega esta línea para devolver el segmento generado
// }



   
}
