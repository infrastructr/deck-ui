import {createReducer, on} from '@ngrx/store';
import * as ProviderActions from '../actions/provider.actions';
import {Provider} from '../models/provider';
import {Page} from '../../base/models/page';

export const providersFeatureKey = 'providers';
export const providerFeatureKey = 'provider';

export interface ProvidersState {
  providersPage: Page<Provider>;
  isGetProvidersSuccess: boolean;
  isLoading: boolean;
}

export interface ProviderState {
  provider: Provider;
  isCreateSuccess: boolean;
  isGetProviderSuccess: boolean;
  isLoading: boolean;
}

export const initialProvidersState: ProvidersState = {
  providersPage: null,
  isGetProvidersSuccess: false,
  isLoading: false,
};

export const initialProviderState: ProviderState = {
  provider: null,
  isCreateSuccess: null,
  isGetProviderSuccess: false,
  isLoading: false,
};

export const providersReducer = createReducer(
  initialProvidersState,

  on(ProviderActions.getProviders, state => ({
    ...state,
    isLoading: true,
  })),
  on(ProviderActions.getProvidersSuccess, (state, {data}) => ({
    ...state,
    providersPage: data,
    isGetProvidersSuccess: true,
    isLoading: false,
  })),
  on(ProviderActions.getProvidersFailure, (state,) => ({
    ...state,
    isGetProvidersSuccess: false,
    isLoading: false,
  })),
);

export const providerReducer = createReducer(
  initialProviderState,

  on(ProviderActions.resetProvider, () => initialProviderState),
  on(ProviderActions.createProvider, state => ({
    ...state,
    isLoading: true,
  })),
  on(ProviderActions.createProviderSuccess, (state, {data}) => ({
    ...state,
    provider: data,
    isCreateSuccess: true,
    isLoading: false,
  })),
  on(ProviderActions.createProviderFailure, (state,) => ({
    ...state,
    isCreateSuccess: false,
    isLoading: false,
  })),
  on(ProviderActions.getProvider, state => ({
    ...state,
    isLoading: true,
  })),
  on(ProviderActions.getProviderSuccess, (state, {data}) => ({
    ...state,
    provider: data,
    isGetProviderSuccess: true,
    isLoading: false,
  })),
  on(ProviderActions.getProviderFailure, (state,) => ({
    ...state,
    isGetProviderSuccess: false,
    isLoading: false,
  })),
);
