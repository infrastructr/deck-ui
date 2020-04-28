import * as fromHost from '../reducers/host.reducer';
import {hostsStateSelector} from './host.selectors';

describe('Host Selectors', () => {
  it('should select the feature state', () => {
    const result = hostsStateSelector({
      [fromHost.hostsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
