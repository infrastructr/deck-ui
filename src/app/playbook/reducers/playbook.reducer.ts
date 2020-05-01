import {createReducer, on} from '@ngrx/store';
import * as PlaybookActions from '../actions/playbook.actions';
import {Page} from '../../base/models/page';
import {Playbook} from '../models/playbook';

export const playbooksFeatureKey = 'playbooks';
export const playbookFeatureKey = 'playbook';

export interface PlaybooksState {
  playbooksPage: Page<Playbook>;
  isGetSuccess: boolean;
  isLoading: boolean;
}

export const initialPlaybooksState: PlaybooksState = {
  playbooksPage: null,
  isGetSuccess: false,
  isLoading: false,
};

export interface PlaybookState {
  playbook: Playbook;
  isGetSuccess: boolean;
  isCreateSuccess: boolean;
  isLoading: boolean;
}

export const initialPlaybookState: PlaybookState = {
  playbook: null,
  isGetSuccess: false,
  isCreateSuccess: false,
  isLoading: false,
};

export const playbooksReducer = createReducer(
  initialPlaybooksState,

  on(PlaybookActions.getPlaybooks, state => ({
    ...state,
    isLoading: true,
  })),
  on(PlaybookActions.getPlaybooksSuccess, (state, {data}) => ({
    ...state,
    playbooksPage: data,
    isGetSuccess: true,
    isLoading: false,
  })),
  on(PlaybookActions.getPlaybooksFailure, (state, ) => ({
    ...state,
    isGetSuccess: false,
    isLoading: false,
  })),
);

export const playbookReducer = createReducer(
  initialPlaybookState,

  on(PlaybookActions.resetPlaybook, () => initialPlaybookState),
  on(PlaybookActions.createPlaybook, state => ({
    ...state,
    isLoading: true,
  })),
  on(PlaybookActions.createPlaybookSuccess, (state, {data}) => ({
    ...state,
    playbook: data,
    isCreateSuccess: true,
    isLoading: false,
  })),
  on(PlaybookActions.createPlaybookFailure, (state, ) => ({
    ...state,
    isCreateSuccess: false,
    isLoading: false,
  })),
  on(PlaybookActions.getPlaybook, state => ({
    ...state,
    isLoading: true,
  })),
  on(PlaybookActions.getPlaybookSuccess, (state, {data}) => ({
    ...state,
    playbook: data,
    isGetSuccess: true,
    isLoading: false,
  })),
  on(PlaybookActions.getPlaybookFailure, (state, ) => ({
    ...state,
    isGetSuccess: false,
    isLoading: false,
  })),
);
