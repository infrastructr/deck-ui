import {createAction, props} from '@ngrx/store';
import {CreateProjectRequest} from '../models/create-project-request';
import {Pageable} from '../../base/models/pageable';

export const getProjects = createAction('[Project] Get Projects', props<{ pageable: Pageable }>());
export const getProjectsSuccess = createAction('[Project] Get Projects Success', props<{ data: any }>());
export const getProjectsFailure = createAction('[Project] Get Projects Failure', props<{ error: any }>());

export const resetProject = createAction('[Project] Reset Project');
export const createProject = createAction('[Project] Create Project', props<{ request: CreateProjectRequest }>());
export const createProjectSuccess = createAction('[Project] Create Project Success', props<{ data: any }>());
export const createProjectFailure = createAction('[Project] Create Project Failure', props<{ error: any }>());

export const getProject = createAction('[Project] Get Project', props<{ id: string }>());
export const getProjectSuccess = createAction('[Project] Get Project Success', props<{ data: any }>());
export const getProjectFailure = createAction('[Project] Get Project Failure', props<{ error: any }>());
