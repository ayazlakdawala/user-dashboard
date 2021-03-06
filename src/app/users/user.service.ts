import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Post } from './post';

/**
 * @author Ayaz Lakdawala
 * @description Service class to fetch user data.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`); 
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`); 
  }

  getPosts(id: number): Observable<Post[]> {

    const options = { params: new HttpParams().set('userid', id) };

    return this.http.get<Post[]>(`${this.baseUrl}/posts`, options); 
  }
}
