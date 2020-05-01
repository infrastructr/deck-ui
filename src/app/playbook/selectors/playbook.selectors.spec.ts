import * as fromPlaybook from '../reducers/playbook.reducer';
import {playbooksStateSelector} from './playbook.selectors';
import {PlaybooksState} from '../reducers/playbook.reducer';

describe('Playbook Selectors', () => {
  it('should select the playbooks state', () => {
    const result = playbooksStateSelector({
      [fromPlaybook.playbooksFeatureKey]: {}
    });

    expect(result).toEqual({} as PlaybooksState);
  });
});
