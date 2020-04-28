import * as fromProject from '../reducers/project.reducer';
import {projectsStateSelector} from './project.selectors';

describe('Project Selectors', () => {
  it('should select the feature state', () => {
    const result = projectsStateSelector({
      [fromProject.projectsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
