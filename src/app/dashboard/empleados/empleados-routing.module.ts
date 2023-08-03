import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmpleadosListComponent } from './empleados-list/empleados-list.component';
import { AddEmpleadoComponent } from './add-empleado/add-empleado.component';
import { EditEmpleadoComponent } from './edit-empleado/edit-empleado.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EmpleadosListComponent },
        { path: 'nuevo', component: AddEmpleadoComponent }, 
        { path: 'editar/:id', component: EditEmpleadoComponent },
      
       ])],
    exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
