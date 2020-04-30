import {groupsReducer, initialGroupsState} from './group.reducer';

describe('Group Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = groupsReducer(initialGroupsState, action);

      expect(result).toBe(initialGroupsState);
    });
  });
});
