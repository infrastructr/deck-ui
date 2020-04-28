import {createAction, props} from '@ngrx/store';
import {Pageable} from '../../base/models/pageable';
import {CreateInventoryRequest} from '../models/create-inventory-request';

export const getInventories = createAction(
  '[Inventory] Load Inventories',
  props<{ params: { [key: string]: string; }, pageable: Pageable }>()
);
export const getInventoriesSuccess = createAction('[Inventory] Load Inventories Success', props<{ data: any }>());
export const getInventoriesFailure = createAction('[Inventory] Load Inventories Failure', props<{ error: any }>());

export const resetInventory = createAction('[Inventory] Reset Inventory');
export const createInventory = createAction(
  '[Inventory] Create Inventory',
  props<{ params: { [key: string]: string; }, request: CreateInventoryRequest }>()
);
export const createInventorySuccess = createAction(
  '[Inventory] Create Inventory Success',
  props<{ params: { [key: string]: string; }, data: any }>()
);
export const createInventoryFailure = createAction(
  '[Inventory] Create Inventory Failure',
  props<{ error: any }>()
);

export const getInventory = createAction('[Inventory] Get Inventory', props<{ id: string }>());
export const getInventorySuccess = createAction('[Inventory] Get Inventory Success', props<{ data: any }>());
export const getInventoryFailure = createAction('[Inventory] Get Inventory Failure', props<{ error: any }>());
