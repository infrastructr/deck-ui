import * as fromUser from '../reducers/user.reducer';
import {userStateSelector} from './user.selectors';
import {UserState} from '../reducers/user.reducer';

describe('User Selectors', () => {
  it('should select the user state', () => {
    const result = userStateSelector({
      [fromUser.userFeatureKey]: {}
    });

    expect(result).toEqual({} as UserState);
  });
});
