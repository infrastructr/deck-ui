import * as fromHost from '../reducers/host.reducer';
import {hostsStateSelector} from './host.selectors';
import {HostsState} from '../reducers/host.reducer';

describe('Host Selectors', () => {
  it('should select the hosts state', () => {
    const result = hostsStateSelector({
      [fromHost.hostsFeatureKey]: {}
    });

    expect(result).toEqual({} as HostsState);
  });
});
