import { Injectable } from '@angular/core';
import { CacheService } from '../../auth/cache-service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IAuthStatus, AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { IUser, User } from './user';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { transformError } from '../../common/common';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CacheService {

  curentUser = new BehaviorSubject<IUser>(this.getItem('user') || new User());

  private currentAuthStatus: IAuthStatus;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
    this.curentUser.subscribe(user => this.setItem('user', user));
    this.authService.authStatus.subscribe(authStatus => this.currentAuthStatus = authStatus);
   }

   getCurrentUser(): Observable<IUser> {
    const userObservable = this.getUser(this.currentAuthStatus.userId)
    .pipe(catchError(transformError));

    userObservable.subscribe(
      user => this.curentUser.next(user),
      err => Observable.throw(err)
    );

    return userObservable;
   }

   getUser(id): Observable<IUser> {
     return this.httpClient.get<IUser>(`${environment.baseUrl}/v1/user/${id}`);
   }

  updateUser(user: IUser): Observable<IUser> {
     /**
      * cache user data in case of errors
      */
    this.setItem('draft-user', user);

    const updateResponse = this.httpClient.put<IUser>(`${environment.baseUrl}/v1/user/${user.id}`, user)
      .pipe(catchError(transformError));

    updateResponse.subscribe(
       res => {
         this.curentUser.next(res);
         this.removeItem('draft-user');
       },
       err => Observable.throw(err)
      );

    return updateResponse;
  }
}
