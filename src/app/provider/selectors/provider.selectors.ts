import {createFeatureSelector, createSelector} from '@ngrx/store';
import {providerFeatureKey, providersFeatureKey, ProvidersState, ProviderState} from '../reducers/provider.reducer';

export const providersStateSelector = createFeatureSelector<ProvidersState>(providersFeatureKey);
export const providersSelector = createSelector(providersStateSelector, (state) => state.providersPage?.content);
export const providersTotalElementsSelector = createSelector(providersStateSelector, (state) => state.providersPage?.totalElements);
export const providersIsLoadingSelector = createSelector(providersStateSelector, (state) => state.isLoading);

export const providerStateSelector = createFeatureSelector<ProviderState>(providerFeatureKey);
export const providerSelector = createSelector(providerStateSelector, (state) => state.provider);
export const providerIsCreateSuccessSelector = createSelector(providerStateSelector, (state) => state?.isCreateSuccess);
