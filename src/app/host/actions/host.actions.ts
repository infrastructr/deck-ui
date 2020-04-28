import {createAction, props} from '@ngrx/store';
import {Pageable} from '../../base/models/pageable';
import {CreateHostRequest} from '../models/create-host-request';

export const getHosts = createAction('[Host] Load Hosts', props<{ params: { [key: string]: string; }, pageable: Pageable }>());
export const getHostsSuccess = createAction('[Host] Load Hosts Success', props<{ data: any }>());
export const getHostsFailure = createAction('[Host] Load Hosts Failure', props<{ error: any }>());

export const createHost = createAction(
  '[Host] Create Host',
  props<{ params: { [key: string]: string; }, request: CreateHostRequest }>()
);
export const createHostSuccess = createAction(
  '[Host] Create Host Success',
  props<{ params: { [key: string]: string; }, data: any }>()
);
export const createHostFailure = createAction('[Host] Create Host Failure', props<{ error: any }>());

export const resetHost = createAction('[Host] Reset Host');
export const getHost = createAction('[Host] Get Host', props<{ id: string }>());
export const getHostSuccess = createAction('[Host] Get Host Success', props<{ data: any }>());
export const getHostFailure = createAction('[Host] Get Host Failure', props<{ error: any }>());

export const initHost = createAction('[Host] Init Host', props<{ id: string }>());
export const initHostSuccess = createAction('[Host] Init Host Success', props<{ data: any }>());
export const initHostFailure = createAction('[Host] Init Host Failure', props<{ error: any }>());
