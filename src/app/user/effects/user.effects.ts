import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {UserService} from '../services/user.service';

import * as UserActions from '../actions/user.actions';
import {loginSuccess, logoutSuccess} from '../actions/user.actions';
import {Action} from '@ngrx/store';
import {Router} from '@angular/router';

@Injectable()
export class UserEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.login),
      concatMap(({username, password}) => this.userService.login(username, password)
        .pipe(
          switchMap(() => [
            UserActions.loginSuccess(),
            UserActions.getCurrentUser(),
          ]),
          catchError(error => of(UserActions.loginFailure({error}))))
      )
    );
  });

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(() => {
      this.router.navigate(['projects']);
    }),
    ),
    {dispatch: false}
  );

  getCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getCurrentUser),
      concatMap(() => this.userService.getMe()
        .pipe(
          map(user => UserActions.getCurrentUserSuccess({user})),
          catchError(error => of(UserActions.getCurrentUserFailure({error}))))
      )
    );
  });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    switchMap(() => this.userService.logout()
      .pipe(
        map(() => UserActions.logoutSuccess()),
        catchError(() => EMPTY)
      )
    )
  ));

  logoutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(logoutSuccess),
    tap(() => {
      this.router.navigate(['login']);
    }),
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngrxOnInitEffects(): Action {
    return UserActions.getCurrentUser();
  }
}
