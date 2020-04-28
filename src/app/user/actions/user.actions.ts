import {createAction, props} from '@ngrx/store';
import {User} from '../models/user';

export const login = createAction('[User] Login User', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[User] Login User Success');
export const loginFailure = createAction('[User] Login User Failure', props<{ error: any }>());

export const getCurrentUser = createAction('[User] Get Current User');
export const getCurrentUserSuccess = createAction('[User] Get Current User Success', props<{ user: User }>());
export const getCurrentUserFailure = createAction('[User] Get Current User Failure', props<{ error: any }>());

export const logout = createAction('[User] Logout User');
export const logoutSuccess = createAction('[Users] Logout User Success');
