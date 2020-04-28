import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ProviderService} from '../services/provider.service';

import * as ProviderActions from '../actions/provider.actions';
import {createProvider, createProviderSuccess} from '../actions/provider.actions';
import {Router} from '@angular/router';


@Injectable()
export class ProviderEffects {

  getProviders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProviderActions.getProviders),
      concatMap(({pageable}) => this.providerService.getAll(pageable)
        .pipe(
          map(data => ProviderActions.getProvidersSuccess({data})),
          catchError(error => of(ProviderActions.getProvidersFailure({error}))))
      )
    );
  });

  createProvider$ = createEffect(() => this.actions$.pipe(
    ofType(createProvider),
    concatMap(({request}) => this.providerService.create(request)
      .pipe(
        map(data => ProviderActions.createProviderSuccess({data})),
        catchError(error => of(ProviderActions.createProviderFailure({error}))),
      ))
  ));

  createProviderSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(createProviderSuccess),
    tap(({data}) => {
      this.router.navigate(['providers']);
    }),
    ),
    {dispatch: false}
  );

  getProvider$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProviderActions.getProvider),
      concatMap(({id}) => this.providerService.getById(id)
        .pipe(
          map(data => ProviderActions.getProviderSuccess({data})),
          catchError(error => of(ProviderActions.getProviderFailure({error}))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private providerService: ProviderService
  ) {
  }

}
