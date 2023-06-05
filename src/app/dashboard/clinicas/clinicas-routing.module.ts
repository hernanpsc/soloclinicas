import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClinicasListComponent } from './clinicas-list/clinicas-list.component';
import { AddClinicaComponent } from './add-clinica/add-clinica.component';
import { EditClinicaComponent } from './edit-clinica/edit-clinica.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ClinicasListComponent },
        { path: 'nuevo', component: AddClinicaComponent }, 
        { path: 'editar/:id', component: EditClinicaComponent },
      
       ])],
    exports: [RouterModule]
})
export class ClinicasRoutingModule { }
