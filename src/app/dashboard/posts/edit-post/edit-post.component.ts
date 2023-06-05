import { Component, OnInit } from '@angular/core';




import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../../../interfaces/posts';
import { PostsService } from '../../../servicios/posts.service';

@Component({
  selector: 'app-edit-post.component.ts',
  templateUrl: 'edit-post.component.html',
  styleUrls: ['edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  post: BehaviorSubject<Post> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('id No Provisto');
    }

    this.postsService.getPost(id !).subscribe((post) => {
      this.post.next(post);
    });
  }

  editPost(post: Post) {
    this.postsService.updatePost(this.post.value._id || '', post)
      .subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: (error) => {
          alert('Falló actualizar post');
          console.error(error);
        }
      })
  }
}
