import {createReducer, on} from '@ngrx/store';
import * as GroupActions from '../actions/group.actions';
import {Page} from '../../base/models/page';
import {Group} from '../models/group';

export const groupsFeatureKey = 'groups';
export const groupFeatureKey = 'group';

export interface GroupsState {
  groupsPage: Page<Group>;
  isGetSuccess: boolean;
  isLoading: boolean;
}

export const initialGroupsState: GroupsState = {
  groupsPage: null,
  isGetSuccess: false,
  isLoading: false,
};

export interface GroupState {
  group: Group;
  isGetSuccess: boolean;
  isLoading: boolean;
  isCreateSuccess: boolean;
}

export const initialGroupState: GroupState = {
  group: null,
  isGetSuccess: false,
  isLoading: false,
  isCreateSuccess: false,
};

export const groupsReducer = createReducer(
  initialGroupsState,

  on(GroupActions.getGroups, state => ({
    ...state,
    isLoading: true,
  })),
  on(GroupActions.getGroupsSuccess, (state, {data}) => ({
    ...state,
    groupsPage: data,
    isGetSuccess: true,
    isLoading: false,
  })),
  on(GroupActions.getGroupsFailure, (state, ) => ({
    ...state,
    isGetSuccess: false,
    isLoading: false,
  })),
);

export const groupReducer = createReducer(
  initialGroupState,

  on(GroupActions.resetGroup, () => initialGroupState),
  on(GroupActions.createGroup, state => ({
    ...state,
    isLoading: true,
  })),
  on(GroupActions.createGroupSuccess, state => ({
    ...state,
    isCreateSuccess: true,
    isLoading: false,
  })),
  on(GroupActions.createGroupFailure, state => ({
    ...state,
    isCreateSuccess: false,
    isLoading: false,
  })),
  on(GroupActions.getGroup, state => ({
    ...state,
    isLoading: true,
  })),
  on(GroupActions.getGroupSuccess, (state, {data}) => ({
    ...state,
    group: data,
    isGetSuccess: true,
    isLoading: false,
  })),
  on(GroupActions.getGroupFailure, (state, ) => ({
    ...state,
    isGetSuccess: false,
    isLoading: false,
  })),
);
