import * as fromProvider from './provider.actions';

describe('getProviders', () => {
  it('should return an action', () => {
    expect(fromProvider.getProviders.type).toBe('[Provider] Get Providers');
  });
});
