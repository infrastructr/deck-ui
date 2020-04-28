import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromInventory from '../reducers/inventory.reducer';

export const inventoriesStateSelector = createFeatureSelector<fromInventory.InventoriesState>(fromInventory.inventoriesFeatureKey);
export const inventoriesSelector = createSelector(inventoriesStateSelector, (state) => state.inventoriesPage?.content);
export const inventoriesTotalElementsSelector = createSelector(inventoriesStateSelector, (state) => state.inventoriesPage?.totalElements);
export const inventoriesIsLoadingSelector = createSelector(inventoriesStateSelector, (state) => state.isLoading);

export const inventoryStateSelector = createFeatureSelector<fromInventory.InventoryState>(fromInventory.inventoryFeatureKey);
export const inventorySelector = createSelector(inventoryStateSelector, (state) => state?.inventory);
export const inventoryIsCreateSuccessSelector = createSelector(
  inventoryStateSelector, (state) => state?.isCreateSuccess
);
