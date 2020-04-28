import * as fromInventory from '../reducers/inventory.reducer';
import {inventoriesStateSelector} from './inventory.selectors';

describe('Inventory Selectors', () => {
  it('should select the feature state', () => {
    const result = inventoriesStateSelector({
      [fromInventory.inventoriesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
