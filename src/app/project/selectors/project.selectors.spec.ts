import * as fromProject from '../reducers/project.reducer';
import {projectsStateSelector} from './project.selectors';
import {ProjectsState} from '../reducers/project.reducer';

describe('Project Selectors', () => {
  it('should select the projects state', () => {
    const result = projectsStateSelector({
      [fromProject.projectsFeatureKey]: {}
    });

    expect(result).toEqual({} as ProjectsState);
  });
});
