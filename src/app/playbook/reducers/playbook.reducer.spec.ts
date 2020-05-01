import {initialPlaybooksState, playbooksReducer} from './playbook.reducer';

describe('Playbooks Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = playbooksReducer(initialPlaybooksState, action);

      expect(result).toBe(initialPlaybooksState);
    });
  });
});
