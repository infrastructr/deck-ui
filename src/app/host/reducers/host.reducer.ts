import {createReducer, on} from '@ngrx/store';
import * as HostActions from '../actions/host.actions';
import {Page} from '../../base/models/page';
import {Host} from '../models/host';
import {HostInit} from '../models/host-init';

export const hostsFeatureKey = 'hosts';
export const hostFeatureKey = 'host';
export const hostInitFeatureKey = 'hostInit';

export interface HostsState {
  hostsPage: Page<Host>;
  isGetSuccess: boolean;
  isLoading: boolean;
}

export const initialHostsState: HostsState = {
  hostsPage: null,
  isGetSuccess: false,
  isLoading: false,
};

export interface HostState {
  host: Host;
  isGetSuccess: boolean;
  isLoading: boolean;
  isCreateSuccess: boolean;
}

export const initialHostState: HostState = {
  host: null,
  isGetSuccess: false,
  isLoading: false,
  isCreateSuccess: false,
};

export interface HostInitState {
  init: HostInit;
  isGetHostInitSuccess: boolean;
  isLoading: boolean;
}

export const initialHostInitState: HostInitState = {
  init: null,
  isGetHostInitSuccess: false,
  isLoading: false,
};

export const hostsReducer = createReducer(
  initialHostsState,

  on(HostActions.getHosts, state => ({
    ...state,
    isLoading: true,
  })),
  on(HostActions.getHostsSuccess, (state, {data}) => ({
    ...state,
    hostsPage: data,
    isGetSuccess: true,
    isLoading: false,
  })),
  on(HostActions.getHostsFailure, (state,) => ({
    ...state,
    isGetSuccess: false,
    isLoading: false,
  })),
);

export const hostReducer = createReducer(
  initialHostState,

  on(HostActions.resetHost, () => initialHostState),
  on(HostActions.createHost, state => ({
    ...state,
    isLoading: true,
  })),
  on(HostActions.createHostSuccess, state => ({
    ...state,
    isCreateSuccess: true,
    isLoading: false,
  })),
  on(HostActions.createHostFailure, state => ({
    ...state,
    isCreateSuccess: false,
    isLoading: false,
  })),
  on(HostActions.getHost, state => ({
    ...state,
    isLoading: true,
  })),
  on(HostActions.getHostSuccess, (state, {data}) => ({
    ...state,
    host: data,
    isGetSuccess: true,
    isLoading: false,
  })),
  on(HostActions.getHostFailure, (state,) => ({
    ...state,
    isGetSuccess: false,
    isLoading: false,
  })),
);

export const hostInitReducer = createReducer(
  initialHostInitState,

  on(HostActions.initHost, state => ({
    ...state,
    isLoading: true,
  })),
  on(HostActions.initHostSuccess, (state, {data}) => ({
    ...state,
    init: data,
    isGetHostInitSuccess: true,
    isLoading: false,
  })),
  on(HostActions.initHostFailure, (state,) => ({
    ...state,
    isGetHostInitSuccess: false,
    isLoading: false,
  })),
);
