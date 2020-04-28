import * as fromInventories from './inventory.actions';

describe('getInventories', () => {
  it('should return an action', () => {
    expect(fromInventories.getInventories.type).toBe('[Inventory] Get Inventories');
  });
});
