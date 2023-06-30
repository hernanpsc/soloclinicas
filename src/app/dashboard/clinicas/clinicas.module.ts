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

import { ClinicasListComponent } from './clinicas-list/clinicas-list.component';
import { AddClinicaComponent } from './add-clinica/add-clinica.component';
import { ClinicasFormComponent } from './clinica-form/clinica-form.component';
import { EditClinicaComponent } from './edit-clinica/edit-clinica.component';
import { ClinicasRoutingModule } from './clinicas-routing.module';
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
        ClinicasRoutingModule,
        TreeSelectModule,
        TreeModule,
        MegaMenuModule,
        PanelMenuModule
        


    ],
    declarations: [
        AddClinicaComponent,
        ClinicasListComponent,
        ClinicasFormComponent,
        EditClinicaComponent
    ],
    providers: [
        MessageService
    ]
    
})
export class ClinicasModule { }