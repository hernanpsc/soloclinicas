import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlanesListComponent } from './planes/planes-list/planes-list.component';
import { AddPlanComponent } from './planes/add-plan/add-plan.component';
import { EditPlanComponent } from './planes/edit-plan/edit-plan.component';
import { EmpresasListComponent } from './empresas/empresas-list/empresas-list.component';
import { AddEmpresaComponent } from './empresas/add-empresa/add-empresa.component';
import { EditEmpresaComponent } from './empresas/edit-empresa/edit-empresa.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { DashboardComponent } from './dashboard.component';
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component';
import { AddEmpleadoComponent } from './empleados/add-empleado/add-empleado.component';
import { EditEmpleadoComponent } from './empleados/edit-empleado/edit-empleado.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'clinicas', loadChildren: () => import('./clinicas/clinicas.module').then(m => m.ClinicasModule) },
        { path: 'planes', component: PlanesListComponent },
        { path: 'planes/nuevo', component: AddPlanComponent }, 
        { path: 'planes/editar/:id', component: EditPlanComponent },
        { path: 'empresas', component: EmpresasListComponent },
        { path: 'empresas/nuevo', component: AddEmpresaComponent }, 
        { path: 'empresas/editar/:id', component: EditEmpresaComponent },
        { path: 'posts', component: PostsListComponent },
        { path: 'posts/nuevo', component: AddPostComponent }, 
        { path: 'posts/editar/:id', component: EditPostComponent },
        { path: 'empleados', component: EmpleadosListComponent },
        { path: 'empleados/nuevo', component: AddEmpleadoComponent }, 
        { path: 'empleados/editar/:id', component: EditEmpleadoComponent },
       ])],
    exports: [RouterModule]
})
export class DashRoutingModule { }
