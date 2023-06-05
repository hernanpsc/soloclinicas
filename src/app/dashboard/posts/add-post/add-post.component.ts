import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../interfaces/posts';
import { PostsService } from '../../../servicios/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'] 
})
export class AddPostComponent {
  constructor(
    private router: Router,
    private postsService: PostsService
  ) { }

  addPost(post: Post) {
    this.postsService.createPost(post)
      .subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: (error) => {
          alert("Falló crear post");
          console.error(error);
        }
      });
  }
}
