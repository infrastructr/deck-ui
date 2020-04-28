import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) {
  }

  login(username, password): Observable<User> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post<User>(`${environment.baseUrl}/users/login`, formData);
  }

  logout() {
    return this.http.get(`${environment.baseUrl}/users/logout`);
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/users/me`);
  }

}
