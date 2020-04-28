import * as fromProvider from '../reducers/provider.reducer';
import {providersStateSelector} from './provider.selectors';
import {ProvidersState} from '../reducers/provider.reducer';

describe('Provider Selectors', () => {
  it('should select the providers state', () => {
    const result = providersStateSelector({
      [fromProvider.providersFeatureKey]: {}
    });

    expect(result).toEqual({} as ProvidersState);
  });
});
