import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../../../interfaces/empresas';
import { EmpresasService } from '../../../servicios/empresas.service';


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
  constructor(private fb: FormBuilder,private http: HttpClient,private empresasService: EmpresasService) {
    this.imageUploadForm = this.fb.group({
      image: [null, Validators.required],
      description: [''],
    });
  }

  get item_id() { return this.empresaForm.get('item_id'); }
  get name() { return this.empresaForm.get('name'); }
  get images() {return this.empresaForm.get('images') as FormArray}  
  get sigla() { return this.empresaForm.get('sigla'); }
  get lineas() { return this.empresaForm.get('lineas'); }

  ngOnInit() {
    console.log()
    this.initialState.subscribe(empresa => {
      const imagesArray = this.fb.array([]);
      if (Array.isArray(empresa.images)) {
        // Si empresa.images es un array, crea el FormArray con sus valores
        empresa.images.forEach(image => imagesArray.push(this.fb.control(image)));
      }
      const lineasArray = this.fb.array([]);
      if (Array.isArray(empresa.lineas)) {
        // Si empresa.lineas es un array, crea el FormArray con sus valores
        empresa.lineas.forEach((linea) => lineasArray.push(this.fb.control(linea)));
      }
      this.empresaForm = this.fb.group({
        _id: [ empresa._id ],
        name: [ empresa.name ],
        item_id: [ empresa.item_id],
        images: imagesArray,
        sigla: [ empresa.sigla],
        lineas: lineasArray,
      });
    });
    const currentEmpresaState = this.empresaForm.get('_id')
    console.log(currentEmpresaState)
    this.isEditMode = !!currentEmpresaState;
    this.empresaForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
  
  submitForm() {
    console.log(this.empresaForm.value)
    const formValue = this.empresaForm.value;
    // Realizar acciones según el contexto (agregar o editar)
    if (this.isEditMode) {
      // Acciones para editar clínica
      // ...
 
      console.log('Datos de empresa editados:', formValue);
    } else {
      // Acciones para agregar nueva clínica
      // ...
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
  sendFile(): void{
    const body = new FormData();
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    this.empresasService.sendPost(body)
    .subscribe(res => console.log(res))
  }
  onUpload() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
console.log(this.selectedFile.name)
    this.http.post<any>('http://localhost:5200/upload', formData).subscribe(
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
}
