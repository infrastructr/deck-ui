import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as PlaybookActions from '../actions/playbook.actions';
import {createPlaybook} from '../actions/playbook.actions';
import {PlaybookService} from '../services/playbook.service';


@Injectable()
export class PlaybookEffects {

  getPlaybooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlaybookActions.getPlaybooks),
      concatMap(({params, pageable}) => this.playbookService.getAll(params.projectId, pageable)
        .pipe(
          map(data => PlaybookActions.getPlaybooksSuccess({data})),
          catchError(error => of(PlaybookActions.getPlaybooksFailure({error}))))
      )
    );
  });

  createPlaybook$ = createEffect(() => this.actions$.pipe(
    ofType(createPlaybook),
    concatMap(({params, request}) => this.playbookService.create(params.projectId, request)
      .pipe(
        map(data => PlaybookActions.createPlaybookSuccess({params, data})),
        catchError(error => of(PlaybookActions.createPlaybookFailure({error}))),
      ))
  ));

  getPlaybook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlaybookActions.getPlaybook),
      concatMap(({id}) => this.playbookService.getById(id)
        .pipe(
          map(data => PlaybookActions.getPlaybookSuccess({data})),
          catchError(error => of(PlaybookActions.getPlaybookFailure({error}))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private playbookService: PlaybookService,
  ) {
  }

}
