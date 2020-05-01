import {createAction, props} from '@ngrx/store';
import {Pageable} from '../../base/models/pageable';
import {CreatePlaybookRequest} from '../models/create-playbook-request';

export const getPlaybooks = createAction(
  '[Playbook] Get Playbooks',
  props<{ params: { [key: string]: string; }, pageable: Pageable }>()
);
export const getPlaybooksSuccess = createAction('[Playbook] Get Playbooks Success', props<{ data: any }>());
export const getPlaybooksFailure = createAction('[Playbook] Get Playbooks Failure', props<{ error: any }>());

export const resetPlaybook = createAction('[Playbook] Reset Playbook');
export const createPlaybook = createAction(
  '[Playbook] Create Playbook',
  props<{ params: { [key: string]: string; }, request: CreatePlaybookRequest }>()
);
export const createPlaybookSuccess = createAction(
  '[Playbook] Create Playbook Success',
  props<{ params: { [key: string]: string; }, data: any }>()
);
export const createPlaybookFailure = createAction(
  '[Playbook] Create Playbook Failure',
  props<{ error: any }>()
);

export const getPlaybook = createAction('[Playbook] Get Playbook', props<{ id: string }>());
export const getPlaybookSuccess = createAction('[Playbook] Get Playbook Success', props<{ data: any }>());
export const getPlaybookFailure = createAction('[Playbook] Get Playbook Failure', props<{ error: any }>());
