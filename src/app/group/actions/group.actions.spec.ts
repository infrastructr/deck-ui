import * as fromGroup from './group.actions';

describe('loadGroups', () => {
  it('should return an action', () => {
    expect(fromGroup.getGroups.type).toBe('[Group] Get Groups');
  });
});
