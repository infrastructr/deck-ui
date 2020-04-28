import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as InventoryActions from '../actions/inventory.actions';
import {createInventory} from '../actions/inventory.actions';
import {InventoryService} from '../services/inventory.service';
import {Router} from '@angular/router';


@Injectable()
export class InventoryEffects {

  getInventories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InventoryActions.getInventories),
      concatMap(({params, pageable}) => this.inventoryService.getAll(params.projectId, pageable)
        .pipe(
          map(data => InventoryActions.getInventoriesSuccess({data})),
          catchError(error => of(InventoryActions.getInventoriesFailure({error}))))
      )
    );
  });

  createInventory$ = createEffect(() => this.actions$.pipe(
    ofType(createInventory),
    concatMap(({params, request}) => this.inventoryService.create(params.projectId, request)
      .pipe(
        map(data => InventoryActions.createInventorySuccess({params, data})),
        catchError(error => of(InventoryActions.createInventoryFailure({error}))),
      ))
  ));

  getInventory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InventoryActions.getInventory),
      concatMap(({id}) => this.inventoryService.getById(id)
        .pipe(
          map(data => InventoryActions.getInventorySuccess({data})),
          catchError(error => of(InventoryActions.getInventoryFailure({error}))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private inventoryService: InventoryService,
    private router: Router,
  ) {
  }

}
