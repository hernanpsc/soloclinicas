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
import { InputSwitchModule } from 'primeng/inputswitch';
import { PlanesListComponent } from './planes-list/planes-list.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { PlanesFormComponent } from './planes-form/planes-form.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { PlanesRoutingModule } from './planes-routing.module';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeModule } from 'primeng/tree';
import { MessageService } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu'
import {MatChipsModule} from '@angular/material/chips';
;
import { ChipsModule } from 'primeng/chips';
import { ChipsFormControlDirective } from '../../directivas/chips-value-accessor'; // Asegúrate de que la ruta del archivo sea correcta


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
        PlanesRoutingModule,
        TreeSelectModule,
        TreeModule,
        MegaMenuModule,
        PanelMenuModule,
        InputSwitchModule,
        ChipsModule,
        MatChipsModule
    ],
    declarations: [
        AddPlanComponent,
        PlanesListComponent,
        PlanesFormComponent,
        EditPlanComponent,
        ChipsFormControlDirective
    ],
    providers: [
        MessageService
    ]
    
})
export class PlanesModule { }