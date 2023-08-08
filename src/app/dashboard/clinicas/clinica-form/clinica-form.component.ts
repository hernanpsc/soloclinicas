import { Component, EventEmitter, Input, OnInit, Output,ElementRef,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject, forkJoin  } from 'rxjs';
import { Clinicas } from '../../../interfaces/clinicas';
import { Empresa } from '../../../interfaces/empresas';
import { Planes } from '../../../interfaces/planes';
import { PlanSeleccionado } from '../../../interfaces/interfaces';

import { MyMenuItem } from '../../../interfaces/menu'; // Importamos la interfaz MenuItem desde el archivo creado
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ClinicasService } from '../../../servicios/clinicas.service'; // Reemplaza con la ruta correcta al servicio
import { EmpresasService } from '../../../servicios/empresas.service'; // Reemplaza "ruta-del-servicio" con la ruta correcta a tu servicio.
import { PlanesService } from '../../../servicios/planes.service'; 
import { TreeNode } from 'primeng/api'; // Importa la interfaz TreeNode directamente desde 'primeng/api'
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-clinicas-form',
  templateUrl: './clinica-form.component.html',
  styleUrls: [ './clinica-form.component.css',  ],

})

export class ClinicasFormComponent implements OnInit {
  @Input() initialState: BehaviorSubject<Clinicas> = new BehaviorSubject({});
  @Output() formValuesChanged = new EventEmitter<Clinicas>();
  @Output() formSubmitted = new EventEmitter<Clinicas>();
  @Output() cancelDialog = new EventEmitter<void>();
  @Input() buttonText: string = 'Guardar';


    isEditMode: boolean = false;
  clinicaForm: FormGroup = new FormGroup({});
  nodes!: TreeNode[]; // Declara la variable 'nodes' con el tipo TreeNode
      coberturasControl!: FormControl;
  datosTrans!: any[];
  megaMenuItems: MegaMenuItem[] = [];
  panelMenuItems: MenuItem[] = [];
  opcionesMenuDesplegable: MenuItem[] = [];
  menuData: { data: MyMenuItem[] } = { data: [] };
  empresasData: { [x: string]: any[] } = {};
  empresas: Empresa[] = [];
  planesData: Planes[] = [];
  coberturasMenu: MenuItem[] = []; // Aquí guardaremos el menú generado
  showPanelMenu = true; 
   constructor(
    private fb: FormBuilder,
    private clinicasService: ClinicasService, 
    private empresasService: EmpresasService,
    private planesService: PlanesService
    ) { 

    }
  get _id() { return this.clinicaForm.get('_id'); }
  get nombre() { return this.clinicaForm.get('nombre'); }
  get entity() { return this.clinicaForm.get('entity'); }
  get cartillas() { return this.clinicaForm.get('cartillas'); }
  get coberturas() { return this.clinicaForm.get('coberturas'); }
  // get item_id() { return this.clinicaForm.get('item_id'); }
  // get ubicacion() { return this.clinicaForm.get('ubicacion'); }
  // get url() { return this.clinicaForm.get('url'); }
  // get imagen() { return this.clinicaForm.get('imagen'); }
  // get tipo() { return this.clinicaForm.get('tipo'); }
  // get especialidades() { return this.clinicaForm.get('especialidades'); }
  // get rating() { return this.clinicaForm.get('rating'); }
  // get select() { return this.clinicaForm.get('select'); }



     
ngOnInit() {
  console.log()
    this.initialState.subscribe(clinica => {
      this.clinicaForm = this.fb.group({
        _id: [ clinica._id ],
        nombre: [ clinica.nombre ],
        entity: [ clinica.entity ],
        cartillas: [ clinica.cartillas ],
        coberturas: [clinica.coberturas],
        item_id: [ clinica.item_id],
        ubicacion: [ clinica.ubicacion],
        url: [ clinica.url],
        imagen: [ clinica.imagen],
        tipo: [ clinica.tipo],
        especialidades: [ clinica.especialidades],
        rating: [ clinica.rating],
        select: [ clinica.select],        
         


      });
      
      

    });
    const currentClinicaState = this.clinicaForm.get('_id')
    console.log(currentClinicaState)
    this.isEditMode = !!currentClinicaState;
    this.obtenerIDsSeleccionados();
    this.mostrarCoberturas();

    this.clinicaForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

 
  mostrarCoberturas() {
    this.generateMenuLevelOne();
    const coberturasSeleccionadas = this.clinicaForm.get('coberturas')?.value;
    console.log(coberturasSeleccionadas);

    const idsSeleccionados = this.obtenerIDsSeleccionados();
    console.log(idsSeleccionados);

    this.showPanelMenu = !this.showPanelMenu; // Cambia el valor entre true y false
  }
  
  
  generateMenuLevelOne(): void {
  this.empresasService.getEmpresas().subscribe(empresas => {
    this.menuData.data = empresas.map((empresa, index) => ({
      key: index.toString(),
      label: empresa.name, // Utilizar solo el campo 'name' como label
      children: []
    }));
   
    
    console.log(this.menuData)
    // console.log(this.planesData);
    this.generateMenuLevelTwo();
  });
}

generateMenuLevelTwo(): void {
  this.planesService.getPlanes().subscribe(planes => {
    planes.forEach((plan, planIndex) => {
      // Encontrar la empresa correspondiente en menuData
      const empresa = this.menuData.data.find(item => item.label === plan.empresa);

      if (empresa) {
        // Verificar si el plan tiene la propiedad "linea"
        if (plan.linea) {
          // Encontrar o crear el segundo nivel correspondiente a la línea
          const lineaItem = empresa.children?.find(item => item.label === plan.linea);
          if (lineaItem) {
            // Si la línea ya existe en el segundo nivel, agregar el plan como hijo si no existe con el mismo id
            if (!lineaItem.children?.some(item => item.id === plan.item_id)) {
              lineaItem.children?.push({
                key: `${lineaItem.key}-${lineaItem.children?.length ?? 0}`, // Usar la longitud del arreglo como índice
                id: plan.item_id || '',
                label: plan.name || ''
              });
            }
          } else {
            // Si la línea no existe en el segundo nivel, crearla y agregar el plan como hijo si no existe con el mismo id
           
            const nuevaLineaKey = `${empresa.key}-${empresa.children?.length ?? 0}`;
            empresa.children?.push({
              key: nuevaLineaKey,
              label: plan.linea,
              children: [
                {
                  key: `${nuevaLineaKey}-0`, // Reiniciar el índice a cero para el tercer nivel
                  id: plan.item_id || '',
                  label: plan.name || ''
                },
              ],
            });
          }
        } else {
          // Si el plan no tiene la propiedad "linea", agregarlo directamente al segundo nivel si no existe con el mismo id
          if (!empresa.children?.some(item => item.id === plan.item_id)) {
            empresa.children?.push({
              key: `${empresa.key}-${empresa.children?.length ?? 0}`, // Usar la longitud del arreglo como índice
              id: plan.item_id || '',
              label: plan.name || ''
            });
          }
        }
      }
    });

    

  }); 
   const menuLabels: { [x: string]: string | undefined } = {};

  this.menuData.data.forEach(item => {
    menuLabels[item.key] = item.label;
  });
  // console.log(menuLabels) 
  //  console.log(this.menuData);
  this.nodes = [...this.menuData.data];}
  generateArraysFromMenuLabels(menuLabels: { [x: string]: string }): { [x: string]: any[] } {
    const result: { [x: string]: any[] } = {};
  
    for (const key in menuLabels) {
      const label = menuLabels[key];
      result[`items${label.replace(/\s/g, '')}`] = [];
    }
  console.log(result)
    return result;
  }




  
  obtenerIDsSeleccionados(): string[] {
    const coberturasSeleccionadas = this.clinicaForm.get('coberturas')?.value;
    console.log('esta es la linea 97 coberturasSeleccionadas' + coberturasSeleccionadas)
    const idsSeleccionados: string[] = [];
  
    if (coberturasSeleccionadas && Array.isArray(coberturasSeleccionadas)) {
      coberturasSeleccionadas.forEach((cobertura: any) => {
        if (cobertura.id) {
          if (Array.isArray(cobertura.id)) {
            idsSeleccionados.push(...cobertura.id);
          } else {
            idsSeleccionados.push(cobertura.id);
          }
        }
      });
    } 
    this.desarrollar_MenuPanel(coberturasSeleccionadas);
//     const datosTransformados = this.transformarDatos(coberturasSeleccionadas);
// this.datosTrans = datosTransformados;
//     // console.log(datosTransformados);
      this.clinicaForm.patchValue({ cartillas: idsSeleccionados });
  console.log('Array de ids selecionados:  ' + idsSeleccionados)
    return idsSeleccionados;
  }
  
  onEmpresaSeleccionada(empresa: string): void {
    const empresaSeleccionada = this.menuData.data.find((item: MyMenuItem) => item.label === empresa);

    if (empresaSeleccionada) {
      const opcionesEmpresa = empresaSeleccionada.children || [];
      // console.log(opcionesEmpresa);
    } else {
      // console.log(`Empresa "${empresa}" no encontrada.`);
    }
  }
  
  
  
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

      item.children.forEach((child: any) => { 
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


  desarrollar_MenuPanel(planesSeleccionados: { [x: string]: { label: string; key: string } }) {
    if (!planesSeleccionados) {
      return;
    }
    const itemsPorEmpresa = this.generarItemsPorEmpresa(Object.values(planesSeleccionados));
    const menuLabels = this.generarMenuLabels(this.menuData.data);
    const menu = this.generarMenu(menuLabels, itemsPorEmpresa);
  
    // Asignar el menú final a this.panelMenuItems
    this.panelMenuItems = menu;
  }
    
    
  submitForm() {
    const formValue = this.clinicaForm.value;
    // Realizar acciones según el contexto (agregar o editar)
    if (this.isEditMode) {
      // Acciones para editar clínica
      // ...
      formValue.coberturas.forEach((cobertura: { parent: any; }) => {
        delete cobertura.parent;
      });

      console.log('Datos de clínica editados:', formValue);
    } else {
      // Acciones para agregar nueva clínica
      // ...

      console.log('Nueva clínica agregada:', formValue);
    }

    // Emitir el evento de formulario enviado con los datos actualizados o agregados
    this.formSubmitted.emit(this.clinicaForm.value);

  }

  cancelarDialogo() {
    // Emitir el evento de cancelar diálogo
    this.cancelDialog.emit();
  }
  

// Primero, definimos una interfaz para el tipo de datos de los planes seleccionados


// Función para generar las constantes de items para cada empresa a partir de los planes seleccionados
generarItemsPorEmpresa(planesSeleccionados: PlanSeleccionado[]): { [x: string]: any[] } {
  const itemsPorEmpresa: { [x: string]: any[] } = {};

  planesSeleccionados.forEach((plan) => {
    const empresa = plan.key.charAt(0);
    if (plan.hasOwnProperty('id')) {
      if (!itemsPorEmpresa[empresa]) {
        itemsPorEmpresa[empresa] = [];
      }

      let label = plan.label;
      if (empresa === '2') {
        // Condición 1: Mantener solo los primeros 4 caracteres si son números
        const firstFourChars = label.slice(0, 4);
        if (/^\d+$/.test(firstFourChars)) {
          label = firstFourChars;
        } else {
          // Condición 2: Eliminar el octavo carácter si los primeros cuatro no son números
          label = label.slice(0, 7) + label.slice(8);
        }

        // Condición 3: Eliminar duplicados
        if (!itemsPorEmpresa[empresa].some((item) => item.label === label)) {
          itemsPorEmpresa[empresa].push({ label });
        }
      } else if (empresa === '0') {
        // Condición para la empresa "0": Eliminar el texto "c/copagos"
        label = label.replace('c/copagos', '');

        // Condición 4: Eliminar duplicados
        if (!itemsPorEmpresa[empresa].some((item) => item.label === label)) {
          itemsPorEmpresa[empresa].push({ label });
        }
      } else {
        // Para otras empresas, agregar el label sin modificaciones
        itemsPorEmpresa[empresa].push({ label });
      }
    }
  });

  console.log('itemsPorEmpresa después de modificar:', JSON.stringify(itemsPorEmpresa));

  return itemsPorEmpresa;
}





// Función para generar el objeto con las correspondencias entre keys y labels de menús
generarMenuLabels(menuData: MenuItem[]): { [x: string]: string } {
  const menuLabels: { [x: string]: string } = {};

  menuData.forEach((menuItem, index) => {
    const label = menuItem.label;
    if (typeof label === 'string') {
      menuLabels[index.toString()] = label;
    }
  });
  // console.log('menuLabels antes de modificar:', JSON.stringify(menuLabels));

  return menuLabels;
}

// Función para generar el menú final a partir de las constantes de items y las correspondencias de labels
generarMenu(menuLabels: { [x: string]: string }, itemsPorEmpresa: { [x: string]: any[] }): MenuItem[] {
  const menu: MenuItem[] = [];

  Object.keys(itemsPorEmpresa).forEach((empresaKey) => {
    const empresaLabel = menuLabels[empresaKey];
    const menuItem: MenuItem = { label: empresaLabel, items: itemsPorEmpresa[empresaKey] };
    menu.push(menuItem);
  });
  // console.log('menu antes de modificar:', JSON.stringify(menu));
  return menu;
}
}


