import * as fromInventory from '../reducers/inventory.reducer';
import {inventoriesStateSelector} from './inventory.selectors';
import {InventoriesState} from '../reducers/inventory.reducer';

describe('Inventory Selectors', () => {
  it('should select the inventories state', () => {
    const result = inventoriesStateSelector({
      [fromInventory.inventoriesFeatureKey]: {}
    });

    expect(result).toEqual({} as InventoriesState);
  });
});
