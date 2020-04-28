import * as fromProject from './project.actions';

describe('getProjects', () => {
  it('should return an action', () => {
    expect(fromProject.getProjects.type).toBe('[Project] Get Projects');
  });
});
