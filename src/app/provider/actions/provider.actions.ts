import {createAction, props} from '@ngrx/store';
import {CreateProviderRequest} from '../models/create-provider-request';
import {Pageable} from '../../base/models/pageable';

export const getProviders = createAction('[Provider] Get Providers', props<{ pageable: Pageable }>());
export const getProvidersSuccess = createAction('[Provider] Get Providers Success', props<{ data: any }>());
export const getProvidersFailure = createAction('[Provider] Get Providers Failure', props<{ error: any }>());

export const resetProvider = createAction('[Provider] Reset Provider');
export const createProvider = createAction('[Provider] Create Provider', props<{ request: CreateProviderRequest }>());
export const createProviderSuccess = createAction('[Provider] Create Provider Success', props<{ data: any }>());
export const createProviderFailure = createAction('[Provider] Create Provider Failure', props<{ error: any }>());

export const getProvider = createAction('[Provider] Get Provider', props<{ id: string }>());
export const getProviderSuccess = createAction('[Provider] Get Provider Success', props<{ data: any }>());
export const getProviderFailure = createAction('[Provider] Get Provider Failure', props<{ error: any }>());
