import {createReducer, on} from '@ngrx/store';
import * as InventoryActions from '../actions/inventory.actions';
import {Page} from '../../base/models/page';
import {Inventory} from '../models/inventory';

export const inventoriesFeatureKey = 'inventories';
export const inventoryFeatureKey = 'inventory';

export interface InventoriesState {
  inventoriesPage: Page<Inventory>;
  isGetInventoriesSuccess: boolean;
  isLoading: boolean;
}

export const initialInventoriesState: InventoriesState = {
  inventoriesPage: null,
  isGetInventoriesSuccess: false,
  isLoading: false,
};

export interface InventoryState {
  inventory: Inventory;
  isGetInventorySuccess: boolean;
  isCreateSuccess: boolean;
  isLoading: boolean;
}

export const initialInventoryState: InventoryState = {
  inventory: null,
  isGetInventorySuccess: false,
  isCreateSuccess: false,
  isLoading: false,
};

export const inventoriesReducer = createReducer(
  initialInventoriesState,

  on(InventoryActions.getInventories, state => ({
    ...state,
    isLoading: true,
  })),
  on(InventoryActions.getInventoriesSuccess, (state, {data}) => ({
    ...state,
    inventoriesPage: data,
    isGetInventoriesSuccess: true,
    isLoading: false,
  })),
  on(InventoryActions.getInventoriesFailure, (state,) => ({
    ...state,
    isGetInventoriesSuccess: false,
    isLoading: false,
  })),
);

export const inventoryReducer = createReducer(
  initialInventoryState,

  on(InventoryActions.resetInventory, () => initialInventoryState),
  on(InventoryActions.createInventory, state => ({
    ...state,
    isLoading: true,
  })),
  on(InventoryActions.createInventorySuccess, (state, {data}) => ({
    ...state,
    inventory: data,
    isCreateSuccess: true,
    isLoading: false,
  })),
  on(InventoryActions.createInventoryFailure, (state,) => ({
    ...state,
    isCreateSuccess: false,
    isLoading: false,
  })),
  on(InventoryActions.getInventory, state => ({
    ...state,
    isLoading: true,
  })),
  on(InventoryActions.getInventorySuccess, (state, {data}) => ({
    ...state,
    inventory: data,
    isGetInventorySuccess: true,
    isLoading: false,
  })),
  on(InventoryActions.getInventoryFailure, (state,) => ({
    ...state,
    isGetInventorySuccess: false,
    isLoading: false,
  })),
);
