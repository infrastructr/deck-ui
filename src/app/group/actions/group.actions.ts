import {createAction, props} from '@ngrx/store';
import {Pageable} from '../../base/models/pageable';
import {CreateGroupRequest} from '../models/create-group-request';

export const getGroups = createAction('[Group] Get Groups', props<{ params: { [key: string]: string; }, pageable: Pageable }>());
export const getGroupsSuccess = createAction('[Group] Get Groups Success', props<{ data: any }>());
export const getGroupsFailure = createAction('[Group] Get Groups Failure', props<{ error: any }>());

export const createGroup = createAction(
  '[Group] Create Group',
  props<{ params: { [key: string]: string; }, request: CreateGroupRequest }>()
);
export const createGroupSuccess = createAction(
  '[Group] Create Group Success',
  props<{ params: { [key: string]: string; }, data: any }>()
);
export const createGroupFailure = createAction('[Group] Create Group Failure', props<{ error: any }>());

export const resetGroup = createAction('[Group] Reset Group');
export const getGroup = createAction('[Group] Get Group', props<{ id: string }>());
export const getGroupSuccess = createAction('[Group] Get Group Success', props<{ data: any }>());
export const getGroupFailure = createAction('[Group] Get Group Failure', props<{ error: any }>());
