import {createFeatureSelector, createSelector} from '@ngrx/store';
import {projectFeatureKey, projectsFeatureKey, ProjectsState, ProjectState} from '../reducers/project.reducer';

export const projectsStateSelector = createFeatureSelector<ProjectsState>(projectsFeatureKey);
export const projectsSelector = createSelector(projectsStateSelector, (state) => state.projectsPage?.content);
export const projectsTotalElementsSelector = createSelector(projectsStateSelector, (state) => state.projectsPage?.totalElements);
export const projectsIsLoadingSelector = createSelector(projectsStateSelector, (state) => state.isLoading);

export const projectStateSelector = createFeatureSelector<ProjectState>(projectFeatureKey);
export const projectSelector = createSelector(projectStateSelector, (state) => state.project);
export const projectIsCreateSuccessSelector = createSelector(projectStateSelector, (state) => state?.isCreateSuccess);
