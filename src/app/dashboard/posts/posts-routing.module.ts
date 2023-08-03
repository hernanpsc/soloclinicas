import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PostsListComponent },
        { path: 'nuevo', component: AddPostComponent }, 
        { path: 'editar/:id', component: EditPostComponent },
      
       ])],
    exports: [RouterModule]
})
export class PostsRoutingModule { }
