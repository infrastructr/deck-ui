import * as fromHost from './host.actions';

describe('loadHosts', () => {
  it('should return an action', () => {
    expect(fromHost.getHosts().type).toBe('[Host] Load Hosts');
  });
});
