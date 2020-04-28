import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as HostActions from '../actions/host.actions';
import {HostService} from '../services/host.service';


@Injectable()
export class HostEffects {

  getHosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HostActions.getHosts),
      concatMap(({params, pageable}) => this.hostService.getAll(params.inventoryId, pageable)
        .pipe(
          map(data => HostActions.getHostsSuccess({data})),
          catchError(error => of(HostActions.getHostsFailure({error}))))
      )
    );
  });

  createHost$ = createEffect(() => this.actions$.pipe(
    ofType(HostActions.createHost),
    concatMap(({params, request}) => this.hostService.create(params.inventoryId, request)
      .pipe(
        map(data => HostActions.createHostSuccess({params, data})),
        catchError(error => of(HostActions.createHostFailure({error}))),
      ))
  ));

  getHost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HostActions.getHost),
      concatMap(({id}) => this.hostService.getById(id)
        .pipe(
          map(data => HostActions.getHostSuccess({data})),
          catchError(error => of(HostActions.getHostFailure({error}))))
      )
    );
  });

  initHost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HostActions.initHost),
      concatMap(({id}) => this.hostService.initById(id)
        .pipe(
          map(data => HostActions.initHostSuccess({data})),
          catchError(error => of(HostActions.initHostFailure({error}))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private hostService: HostService,
  ) {
  }

}
