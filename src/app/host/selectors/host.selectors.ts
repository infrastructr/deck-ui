import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromHost from '../reducers/host.reducer';

export const hostsStateSelector = createFeatureSelector<fromHost.HostsState>(fromHost.hostsFeatureKey);
export const hostsSelector = createSelector(hostsStateSelector, (state) => state.hostsPage?.content);
export const hostsTotalElementsSelector = createSelector(hostsStateSelector, (state) => state.hostsPage?.totalElements);
export const hostsIsLoadingSelector = createSelector(hostsStateSelector, (state) => state.isLoading);

export const hostStateSelector = createFeatureSelector<fromHost.HostState>(fromHost.hostFeatureKey);
export const hostSelector = createSelector(hostStateSelector, (state) => state?.host);
export const hostIsCreateSuccessSelector = createSelector(hostStateSelector, (state) => state?.isCreateSuccess);

export const hostInitStateSelector = createFeatureSelector<fromHost.HostInitState>(fromHost.hostInitFeatureKey);
export const hostInitSelector = createSelector(hostInitStateSelector, (state) => state?.init);
