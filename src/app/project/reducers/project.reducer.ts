import {createReducer, on} from '@ngrx/store';
import * as ProjectActions from '../actions/project.actions';
import {Project} from '../models/project';
import {Page} from '../../base/models/page';

export const projectsFeatureKey = 'projects';
export const projectFeatureKey = 'project';

export interface ProjectsState {
  projectsPage: Page<Project>;
  isGetProjectsSuccess: boolean;
  isLoading: boolean;
}

export interface ProjectState {
  project: Project;
  isCreateSuccess: boolean;
  isGetProjectSuccess: boolean;
  isLoading: boolean;
}

export const initialProjectsState: ProjectsState = {
  projectsPage: null,
  isGetProjectsSuccess: false,
  isLoading: false,
};

export const initialProjectState: ProjectState = {
  project: null,
  isCreateSuccess: false,
  isGetProjectSuccess: false,
  isLoading: false,
};

export const projectsReducer = createReducer(
  initialProjectsState,

  on(ProjectActions.getProjects, state => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectActions.getProjectsSuccess, (state, {data}) => ({
    ...state,
    projectsPage: data,
    isGetProjectsSuccess: true,
    isLoading: false,
  })),
  on(ProjectActions.getProjectsFailure, (state, ) => ({
    ...state,
    isGetProjectsSuccess: false,
    isLoading: false,
  })),
);

export const projectReducer = createReducer(
  initialProjectState,

  on(ProjectActions.resetProject, () => (initialProjectState)),
  on(ProjectActions.createProject, state => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectActions.createProjectSuccess, (state, {data}) => ({
    ...state,
    project: data,
    isCreateSuccess: true,
    isLoading: false,
  })),
  on(ProjectActions.createProjectFailure, (state, ) => ({
    ...state,
    isCreateSuccess: false,
    isLoading: false,
  })),
  on(ProjectActions.getProject, state => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectActions.getProjectSuccess, (state, {data}) => ({
    ...state,
    project: data,
    isGetProjectSuccess: true,
    isLoading: false,
  })),
  on(ProjectActions.getProjectFailure, (state, ) => ({
    ...state,
    isGetProjectSuccess: false,
    isLoading: false,
  })),
);
