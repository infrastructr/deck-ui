import * as fromUser from '../reducers/user.reducer';
import {userStateSelector} from './user.selectors';

describe('User Selectors', () => {
  it('should select the feature state', () => {
    const result = userStateSelector({
      [fromUser.userFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
