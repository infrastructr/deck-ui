import * as fromUser from './user.actions';

describe('getUser', () => {
  it('should return an action', () => {
    expect(fromUser.login.type).toBe('[User] Login User');
  });
});
