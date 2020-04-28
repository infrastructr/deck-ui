import {initialInventoriesState, inventoriesReducer} from './inventory.reducer';

describe('Inventories Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = inventoriesReducer(initialInventoriesState, action);

      expect(result).toBe(initialInventoriesState);
    });
  });
});
