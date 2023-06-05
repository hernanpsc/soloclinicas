
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../interfaces/posts';
import { PostsService } from '../../../servicios/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: [ './posts-list.component.css']  
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]> = new Observable();

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  deletePost(id: string): void {
    this.postsService.deletePost(id).subscribe({
      next: () => this.fetchPosts()
    });
  }

  private fetchPosts(): void {
    this.posts$ = this.postsService.getPosts();
  }
}
