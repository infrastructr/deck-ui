import {createFeatureSelector, createSelector} from '@ngrx/store';
import {userFeatureKey, UserState} from '../reducers/user.reducer';

export const userStateSelector = createFeatureSelector<UserState>(userFeatureKey);
export const userSelector = createSelector(userStateSelector, (state) => state.user);
