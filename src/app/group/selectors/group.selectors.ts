import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromGroup from '../reducers/group.reducer';

export const groupsStateSelector = createFeatureSelector<fromGroup.GroupsState>(fromGroup.groupsFeatureKey);
export const groupsSelector = createSelector(groupsStateSelector, (state) => state.groupsPage?.content);
export const groupsTotalElementsSelector = createSelector(groupsStateSelector, (state) => state.groupsPage?.totalElements);
export const groupsIsLoadingSelector = createSelector(groupsStateSelector, (state) => state.isLoading);

export const groupStateSelector = createFeatureSelector<fromGroup.GroupState>(fromGroup.groupFeatureKey);
export const groupSelector = createSelector(groupStateSelector, (state) => state?.group);
export const groupIsCreateSuccessSelector = createSelector(groupStateSelector, (state) => state?.isCreateSuccess);
