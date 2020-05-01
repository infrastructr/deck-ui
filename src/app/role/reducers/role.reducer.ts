import {createReducer, on} from '@ngrx/store';
import * as RoleActions from '../actions/role.actions';
import {Page} from '../../base/models/page';
import {Role} from '../models/role';

export const rolesFeatureKey = 'roles';
export const roleFeatureKey = 'role';

export interface RolesState {
  rolesPage: Page<Role>;
  isGetSuccess: boolean;
  isLoading: boolean;
}

export const initialRolesState: RolesState = {
  rolesPage: null,
  isGetSuccess: false,
  isLoading: false,
};

export interface RoleState {
  role: Role;
  isGetSuccess: boolean;
  isLoading: boolean;
  isCreateSuccess: boolean;
}

export const initialRoleState: RoleState = {
  role: null,
  isGetSuccess: false,
  isLoading: false,
  isCreateSuccess: false,
};

export const rolesReducer = createReducer(
  initialRolesState,

  on(RoleActions.getRoles, state => ({
    ...state,
    isLoading: true,
  })),
  on(RoleActions.getRolesSuccess, (state, {data}) => ({
    ...state,
    rolesPage: data,
    isGetSuccess: true,
    isLoading: false,
  })),
  on(RoleActions.getRolesFailure, (state, ) => ({
    ...state,
    isGetSuccess: false,
    isLoading: false,
  })),
);

export const roleReducer = createReducer(
  initialRoleState,

  on(RoleActions.resetRole, () => initialRoleState),
  on(RoleActions.createRole, state => ({
    ...state,
    isLoading: true,
  })),
  on(RoleActions.createRoleSuccess, state => ({
    ...state,
    isCreateSuccess: true,
    isLoading: false,
  })),
  on(RoleActions.createRoleFailure, state => ({
    ...state,
    isCreateSuccess: false,
    isLoading: false,
  })),
  on(RoleActions.getRole, state => ({
    ...state,
    isLoading: true,
  })),
  on(RoleActions.getRoleSuccess, (state, {data}) => ({
    ...state,
    role: data,
    isGetSuccess: true,
    isLoading: false,
  })),
  on(RoleActions.getRoleFailure, (state, ) => ({
    ...state,
    isGetSuccess: false,
    isLoading: false,
  })),
);
