import * as fromProvider from '../reducers/provider.reducer';
import {providersStateSelector} from './provider.selectors';

describe('Provider Selectors', () => {
  it('should select the feature state', () => {
    const result = providersStateSelector({
      [fromProvider.providersFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
