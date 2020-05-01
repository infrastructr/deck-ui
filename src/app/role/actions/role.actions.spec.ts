import * as fromRole from './role.actions';

describe('loadRoles', () => {
  it('should return an action', () => {
    expect(fromRole.getRoles.type).toBe('[Role] Get Roles');
  });
});
