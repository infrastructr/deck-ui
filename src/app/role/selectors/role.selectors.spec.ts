import * as fromRole from '../reducers/role.reducer';
import {rolesStateSelector} from './role.selectors';
import {RolesState} from '../reducers/role.reducer';

describe('Role Selectors', () => {
  it('should select the roles state', () => {
    const result = rolesStateSelector({
      [fromRole.rolesFeatureKey]: {}
    });

    expect(result).toEqual({} as RolesState);
  });
});
