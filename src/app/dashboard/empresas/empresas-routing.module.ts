import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmpresasListComponent } from './empresas-list/empresas-list.component';
import { AddEmpresaComponent } from './add-empresa/add-empresa.component';
import { EditEmpresaComponent } from './edit-empresa/edit-empresa.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EmpresasListComponent },
        { path: 'nuevo', component: AddEmpresaComponent }, 
        { path: 'editar/:id', component: EditEmpresaComponent },
      
       ])],
    exports: [RouterModule]
})
export class EmpresasRoutingModule { }
