import {Inventory} from '../models/inventory';
import {Store} from '@ngrx/store';
import {getInventories} from '../actions/inventory.actions';
import {RxDataSource} from '../../base/datasources/rx-data-source';
import {InventoriesState} from '../reducers/inventory.reducer';
import {inventoriesIsLoadingSelector, inventoriesSelector, inventoriesTotalElementsSelector} from '../selectors/inventory.selectors';

export class InventoryDataSource extends RxDataSource<Inventory, InventoriesState> {

  constructor(
    store: Store<InventoriesState>,
    params: { [key: string]: string; } = {},
  ) {
    super(
      store,
      inventoriesIsLoadingSelector,
      inventoriesTotalElementsSelector,
      inventoriesSelector,
      getInventories,
      params,
    );
  }
}
