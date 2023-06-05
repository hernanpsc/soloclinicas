import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Post } from '../interfaces/posts';
import { SERVER_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = SERVER_URL;
  private posts$: Subject<Post[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshPosts() {
    this.httpClient.get<Post[]>(`${this.url}/posts`)
      .subscribe(posts => {
        this.posts$.next(posts);
      });
  }

  getPosts(): Subject<Post[]> {
    this.refreshPosts();
    return this.posts$;
  }

  getPost(id: string): Observable<Post> {
    return this.httpClient.get<Post>(`${this.url}/posts/${id}`);
  }

  createPost(post: Post): Observable<string> {
    return this.httpClient.post(`${this.url}/posts`, post, { responseType: 'text' });
  }

  updatePost(id: string, post: Post): Observable<string> {
    return this.httpClient.put(`${this.url}/posts/${id}`, post, { responseType: 'text' });
  }

  deletePost(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/posts/${id}`, { responseType: 'text' });
  }
}
