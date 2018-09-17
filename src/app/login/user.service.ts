import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  authenticatedUser: User;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getUserByName(name: string): Observable<User[]> {
    return this.http.get<User[]>('api/users/?name=' + name);
  }

  canActivate() {
    if (this.authenticatedUser && this.authenticatedUser.name === 'admin') {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }

  authenticate(userToAuthenticate: User, password: string): boolean {
    if (userToAuthenticate.password !== password) {
      return false;
    } else {
      this.authenticatedUser = userToAuthenticate;
      return true;
    }
  }

  resetAuthenticatedUser() {
    this.authenticatedUser = undefined;
  }
}
