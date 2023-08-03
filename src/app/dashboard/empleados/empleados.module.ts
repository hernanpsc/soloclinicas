import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';

import { EmpleadosListComponent } from './empleados-list/empleados-list.component';
import { AddEmpleadoComponent } from './add-empleado/add-empleado.component';
import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';
import { EditEmpleadoComponent } from './edit-empleado/edit-empleado.component';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeModule } from 'primeng/tree';
import { MessageService } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';



@NgModule({
    imports: [
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        ReactiveFormsModule,
        RouterModule,
        EmpleadosRoutingModule,
        TreeSelectModule,
        TreeModule,
        MegaMenuModule,
        PanelMenuModule
    ],
    declarations: [
        AddEmpleadoComponent,
        EmpleadosListComponent,
        EmpleadoFormComponent,
        EditEmpleadoComponent
    ],
    providers: [
        MessageService
    ]
    
})
export class EmpleadosModule { }