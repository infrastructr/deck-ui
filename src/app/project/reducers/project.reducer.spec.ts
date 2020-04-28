import {initialProjectsState, projectsReducer} from './project.reducer';

describe('Project Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = projectsReducer(initialProjectsState, action);

      expect(result).toBe(initialProjectsState);
    });
  });
});
