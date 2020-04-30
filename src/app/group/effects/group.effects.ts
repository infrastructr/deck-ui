import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as GroupActions from '../actions/group.actions';
import {GroupService} from '../services/group.service';


@Injectable()
export class GroupEffects {

  getGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.getGroups),
      concatMap(({params, pageable}) => this.groupService.getAll(params.inventoryId, pageable)
        .pipe(
          map(data => GroupActions.getGroupsSuccess({data})),
          catchError(error => of(GroupActions.getGroupsFailure({error}))))
      )
    );
  });

  createGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.createGroup),
    concatMap(({params, request}) => this.groupService.create(params.inventoryId, request)
      .pipe(
        map(data => GroupActions.createGroupSuccess({params, data})),
        catchError(error => of(GroupActions.createGroupFailure({error}))),
      ))
  ));

  getGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.getGroup),
      concatMap(({id}) => this.groupService.getById(id)
        .pipe(
          map(data => GroupActions.getGroupSuccess({data})),
          catchError(error => of(GroupActions.getGroupFailure({error}))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private groupService: GroupService,
  ) {
  }

}
