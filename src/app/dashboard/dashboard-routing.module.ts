import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'clinicas', loadChildren: () => import('./clinicas/clinicas.module').then(m => m.ClinicasModule) },
        { path: 'empresas', loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule) },
        { path: 'planes', loadChildren: () => import('./planes/planes.module').then(m => m.PlanesModule) },
        { path: 'blog', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) },
        { path: 'colaboradores', loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule) },
       ])],
    exports: [RouterModule]
})
export class DashRoutingModule { }
