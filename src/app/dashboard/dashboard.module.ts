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
import { PlanesModule } from './planes/planes.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { ModalModule } from "../_modal/modal.module";


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
        EmpresasModule,
        PlanesModule,
        EmpleadosModule
    ],
    declarations: [
        DashboardComponent,
     ]
})
export class DashboardModule { }
