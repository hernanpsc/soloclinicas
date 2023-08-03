import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PlanesListComponent } from './planes-list/planes-list.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PlanesListComponent },
        { path: 'nuevo', component: AddPlanComponent }, 
        { path: 'editar/:id', component: EditPlanComponent },
      
       ])],
    exports: [RouterModule]
})
export class PlanesRoutingModule { }
