import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Clinicas } from '../../../interfaces/clinicas';
import { Product } from '../../../demo/api/product';
import { MessageService, TreeNode } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from '../../../demo/service/product.service';
import { NodeService } from '../../../demo/service/node.service';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-clinicas-form',
  templateUrl: './clinica-form.component.html',
  styleUrls: [ './clinica-form.component.css',  ]
})
export class ClinicasFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Clinicas> = new BehaviorSubject({});
    @Output()
    
  formValuesChanged = new EventEmitter<Clinicas>();

  @Output()
  formSubmitted = new EventEmitter<Clinicas>();

  clinicaForm: FormGroup = new FormGroup({});
 

  nodes!: any[];
  coberturasControl!: FormControl;
  datosTrans!: any[];
  megaMenuItems: MegaMenuItem[] = [];



  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private nodeService: NodeService
    ) { 
      this.nodeService.getFiles().then((files) => (this.nodes = files));

    }
  get nombre() { return this.clinicaForm.get('nombre'); }
  get entity() { return this.clinicaForm.get('entity'); }
  get cartillas() { return this.clinicaForm.get('cartillas'); }
  get coberturas() { return this.clinicaForm.get('coberturas'); }



     
ngOnInit() {
    this.initialState.subscribe(clinica => {
      this.clinicaForm = this.fb.group({
     
        nombre: [ clinica.nombre ],
        entity: [ clinica.entity ],
        cartillas: [ clinica.cartillas ],
        coberturas: [clinica.coberturas]        
         


      });      this.mostrarCoberturas();

    });
    
  

    this.clinicaForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  mostrarCoberturas() {
    const coberturasSeleccionadas = this.clinicaForm.get('coberturas')?.value;
    console.log( coberturasSeleccionadas);
  
    const idsSeleccionados = this.obtenerIDsSeleccionados();
    console.log(idsSeleccionados);
   
  }
  
  
  obtenerIDsSeleccionados(): string[] {
    const coberturasSeleccionadas = this.clinicaForm.get('coberturas')?.value;
    const idsSeleccionados: string[] = [];
  
    if (coberturasSeleccionadas && Array.isArray(coberturasSeleccionadas)) {
      coberturasSeleccionadas.forEach((cobertura: any) => {
        if (cobertura.id) {
          if (Array.isArray(cobertura.id)) {
            // Si el ID es un array, lo concatenamos con el array de IDs seleccionados
            idsSeleccionados.push(...cobertura.id);
          } else {
            // Si el ID es un valor individual, lo agregamos al array de IDs seleccionados
            idsSeleccionados.push(cobertura.id);
          }
        }
      });
    } this.desarrollarMenu(coberturasSeleccionadas);
    const datosTransformados = this.transformarDatos(coberturasSeleccionadas);
this.datosTrans = datosTransformados;
    // Utiliza los datos transformados como desees
    console.log(datosTransformados);
      this.clinicaForm.patchValue({ cartillas: idsSeleccionados });
  console.log('Array de ids selecionados:  ' +idsSeleccionados)
    return idsSeleccionados;
  }
  
  // Suponiendo que tienes los datos del archivo files.json almacenados en la variable "data"

  
  
  transformarDatos(data: any[]): any[] {
    const niveles: any[] = [];
  
    data.forEach((item) => {
      const nivelActual = item.key.split('-').length - 1;
      const nivelAnterior = niveles[nivelActual - 1];
  
      if (nivelActual === 0) {
        niveles.push(item);
      } else {
        const parentKey = item.key.substring(0, item.key.lastIndexOf('-'));
        const parentItem = this.buscarItemPorKey(niveles[nivelAnterior], parentKey);
  
        if (parentItem) {
          if (!parentItem.children) {
            parentItem.children = [];
          }
          parentItem.children.push(item);
        }
      }
    });
  
    return niveles;
  }
  
  buscarItemPorKey(data: any[], key: string): any {
    if (data) {
      return data.find((item) => item.key === key);
    }
    return null;
  }
  
insertarNodo(data: any[], item: any): void {
    const keys = item.key.split('-');
    let parent = data.find(node => node.key === keys.slice(0, keys.length - 1).join('-'));
  
    if (!parent) {
      parent = this.insertarNodo(data, {
        key: keys.slice(0, keys.length - 1).join('-'),
        label: '',
        children: [],
        partialSelected: false
      });
    }
  
    parent.children.push({
      key: item.key,
      label: item.label,
      children: [],
      partialSelected: false
    });
  
    return parent;
  }
  
  
toggleItem(item: any) {
  item.expanded = !item.expanded;
}
  
convertData(data: any[]): any[] {
  const convertedData: any[] = [];

  data.forEach((item) => {
    const newItem: any = {
      label: item.label,
      icon: `logo-${item.label.toLowerCase().replace(/\s/g, '')}`,
      items: []
    };

    if (item.children) {
      const childItems: any[] = [];

      item.children.forEach((child: any) => { // Especificar el tipo 'any' para 'child'
        const childItem: any = {
          label: child.label
        };

        if (child.children) {
          childItem.items = child.children.map((grandchild: any) => ({ label: grandchild.label }));
        }

        childItems.push(childItem);
      });

      if (childItems.length === 1) {
        newItem.items.push([{ label: 'Planes', items: childItems[0].items }]);
      } else {
        newItem.items.push(childItems);
      }
    }

    convertedData.push(newItem);
  });

  return convertedData;
}


desarrollarMenu(planesSeleccionados: { [x: string]: { label: string; key: string } }) {
  const itemsPremedic: any = [];
    const itemsGaleno: any = []; // Declarar como un arreglo
  const itemsSwissMedical: any = []; // Declarar como un arreglo
  const itemsAvalian: any = []; // Declarar como un arreglo
  const itemsOmint: any = []; // Declarar como un arreglo
  const itemsMedife: any = []; // Declarar como un arreglo
  const itemsSanCorSalud: any = []; // Declarar como un arreglo

  for (const planKey in planesSeleccionados) {
      const plan = planesSeleccionados[planKey];
      const empresa = plan.key.charAt(0);

      if (plan.hasOwnProperty('id')) {
        switch (empresa) {
          case '0':
            itemsPremedic.push({
              label: plan.label
            });
            break;
          case '6':
            itemsGaleno.push({
              label: plan.label
            });
            break;
          case '2':
            itemsSwissMedical.push({
              label: plan.label
            });
            break;
          case '5':
            itemsAvalian.push({
              label: plan.label
            });
            break;
          case '4':
            itemsOmint.push({
              label: plan.label
            });
            break;
          case '1':
            itemsMedife.push({
              label: plan.label
            });
            break;
          case '3':
            itemsSanCorSalud.push({
              label: plan.label
            });
            break;
          default:
            // Plan no reconocido, hacer algo en consecuencia
            break;
        }
      }
    console.log(itemsPremedic);
    console.log(itemsGaleno);

  }  


  const menuMax: MegaMenuItem[] = [];
  const menuPremedic: MegaMenuItem = { label: 'Premedic', items: [] };
  const menuMedife: MegaMenuItem = { label: 'Medife', items: [] };
  const menuSwissMedical: MegaMenuItem = { label: 'Swiss Medical', items: [] };
  const menuAvalian: MegaMenuItem = { label: 'Avalian', items: [] };
  const menuSanCorSalud: MegaMenuItem = { label: 'SanCor Salud', items: [] };
  const menuGaleno: MegaMenuItem = { label: 'Galeno', items: [] };
  const menuOmint: MegaMenuItem = { label: 'OMINT', items: [] };
  
  // Resto del código...
  
  if (itemsPremedic.length > 0) {
    menuPremedic.items = [itemsPremedic];
    menuMax.push(menuPremedic);
  }
  if (itemsGaleno.length > 0) {
    menuGaleno.items = [itemsGaleno];
    menuMax.push(menuGaleno);
  }
  if (itemsSwissMedical.length > 0) {
    menuSwissMedical.items = [itemsSwissMedical];
    menuMax.push(menuSwissMedical);
  }
  if (itemsAvalian.length > 0) {
    menuAvalian.items = [itemsAvalian];
    menuMax.push(menuAvalian);
  }
  if (itemsOmint.length > 0) {
    menuOmint.items = [itemsOmint];
    menuMax.push(menuOmint);
  }
  if (itemsMedife.length > 0) {
    menuMedife.items = [itemsMedife];
    menuMax.push(menuMedife);
  }
  if (itemsSanCorSalud.length > 0) {
    menuSanCorSalud.items = [itemsSanCorSalud];
    menuMax.push(menuSanCorSalud);
  }
  
  console.log(JSON.stringify(menuMax, null, 2));
  this.megaMenuItems = menuMax;
  }
     




  submitForm() {
    console.log(this.clinicaForm.value)

    console.log(this.clinicaForm)
    this.formSubmitted.emit(this.clinicaForm.value);
}
}


