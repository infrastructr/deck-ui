import {rolesReducer, initialRolesState} from './role.reducer';

describe('Role Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = rolesReducer(initialRolesState, action);

      expect(result).toBe(initialRolesState);
    });
  });
});
