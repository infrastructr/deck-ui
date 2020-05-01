import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as RoleActions from '../actions/role.actions';
import {RoleService} from '../services/role.service';


@Injectable()
export class RoleEffects {

  getRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoleActions.getRoles),
      concatMap(({params, pageable}) => this.roleService.getAll(params.playbookId, pageable)
        .pipe(
          map(data => RoleActions.getRolesSuccess({data})),
          catchError(error => of(RoleActions.getRolesFailure({error}))))
      )
    );
  });

  createRole$ = createEffect(() => this.actions$.pipe(
    ofType(RoleActions.createRole),
    concatMap(({params, request}) => this.roleService.create(params.playbookId, request)
      .pipe(
        map(data => RoleActions.createRoleSuccess({params, data})),
        catchError(error => of(RoleActions.createRoleFailure({error}))),
      ))
  ));

  getRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoleActions.getRole),
      concatMap(({id}) => this.roleService.getById(id)
        .pipe(
          map(data => RoleActions.getRoleSuccess({data})),
          catchError(error => of(RoleActions.getRoleFailure({error}))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private roleService: RoleService,
  ) {
  }

}
