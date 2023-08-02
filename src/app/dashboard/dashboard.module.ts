import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { ClinicasModule } from './clinicas/clinicas.module';
import { EmpresasModule } from './empresas/empresas.module';

import { EditPlanComponent } from './planes/edit-plan/edit-plan.component';
import { AddPlanComponent } from './planes/add-plan/add-plan.component';
import { PlanesListComponent } from './planes/planes-list/planes-list.component';
import { PlanesFormComponent } from './planes/planes-form/planes-form.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { ModalModule } from "../_modal/modal.module";
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component';
import { AddEmpleadoComponent } from './empleados/add-empleado/add-empleado.component';
import { EditEmpleadoComponent } from './empleados/edit-empleado/edit-empleado.component';
import { EmpleadoFormComponent } from './empleados/empleado-form/empleado-form.component';

const publicApi = [DashboardComponent];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashRoutingModule,
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ModalModule,
        ClinicasModule,
        EmpresasModule
    ],
    declarations: [
        DashboardComponent,
        AddPlanComponent,
        EditPlanComponent,
        PlanesListComponent,
        PlanesFormComponent,
        AddPostComponent,
        EditPostComponent,
        PostFormComponent,
        PostsListComponent,
        EmpleadosListComponent,
        AddEmpleadoComponent,
        EditEmpleadoComponent,
        EmpleadoFormComponent,]
})
export class DashboardModule { }
