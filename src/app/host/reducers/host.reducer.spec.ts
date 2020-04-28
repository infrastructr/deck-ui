import {hostsReducer, initialHostsState} from './host.reducer';

describe('Host Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = hostsReducer(initialHostsState, action);

      expect(result).toBe(initialHostsState);
    });
  });
});
