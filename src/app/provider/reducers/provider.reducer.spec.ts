import {initialProvidersState, providersReducer} from './provider.reducer';

describe('Provider Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = providersReducer(initialProvidersState, action);

      expect(result).toBe(initialProvidersState);
    });
  });
});
