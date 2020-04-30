import * as fromGroup from '../reducers/group.reducer';
import {groupsStateSelector} from './group.selectors';
import {GroupsState} from '../reducers/group.reducer';

describe('Group Selectors', () => {
  it('should select the groups state', () => {
    const result = groupsStateSelector({
      [fromGroup.groupsFeatureKey]: {}
    });

    expect(result).toEqual({} as GroupsState);
  });
});
