import {createReducer, on} from '@ngrx/store';
import {getCurrentUserFailure, getCurrentUserSuccess, login, loginFailure, loginSuccess, logout} from '../actions/user.actions';
import {User} from '../models/user';

export const userFeatureKey = 'user';

export interface UserState {
  user: User;
  username: string;
  password: string;
  isLoggedIn: boolean;
}

export const initialState: UserState = {
  user: null,
  username: null,
  password: null,
  isLoggedIn: false,
};

export const reducer = createReducer(
  initialState,

  on(login, (state, {username, password}) => ({
    ...state,
    username,
    password,
    isLoggedIn: false,
  })),
  on(loginSuccess, (state) => ({
    ...state,
    password: null,
    isLoggedIn: true,
  })),
  on(loginFailure, (state) => ({
    ...state,
    password: null,
    isLoggedIn: false,
  })),
  on(getCurrentUserSuccess, (state, {user}) => ({
    ...state,
    user,
    isLoggedIn: true,
  })),
  on(getCurrentUserFailure, (state) => ({
    ...state,
    isLoggedIn: false,
  })),
  on(logout, (state) => (
    {
      ...state,
      user: null,
      isLoggedIn: false,
    }
  )),
);
