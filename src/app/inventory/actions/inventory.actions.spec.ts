import * as fromInventories from './inventory.actions';

describe('loadInventories', () => {
  it('should return an action', () => {
    expect(fromInventories.getInventories.type).toBe('[Inventory] Get Inventories');
  });
});
