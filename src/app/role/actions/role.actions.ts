import {createAction, props} from '@ngrx/store';
import {Pageable} from '../../base/models/pageable';
import {CreateRoleRequest} from '../models/create-role-request';

export const getRoles = createAction('[Role] Get Roles', props<{ params: { [key: string]: string; }, pageable: Pageable }>());
export const getRolesSuccess = createAction('[Role] Get Roles Success', props<{ data: any }>());
export const getRolesFailure = createAction('[Role] Get Roles Failure', props<{ error: any }>());

export const createRole = createAction(
  '[Role] Create Role',
  props<{ params: { [key: string]: string; }, request: CreateRoleRequest }>()
);
export const createRoleSuccess = createAction(
  '[Role] Create Role Success',
  props<{ params: { [key: string]: string; }, data: any }>()
);
export const createRoleFailure = createAction('[Role] Create Role Failure', props<{ error: any }>());

export const resetRole = createAction('[Role] Reset Role');
export const getRole = createAction('[Role] Get Role', props<{ id: string }>());
export const getRoleSuccess = createAction('[Role] Get Role Success', props<{ data: any }>());
export const getRoleFailure = createAction('[Role] Get Role Failure', props<{ error: any }>());
