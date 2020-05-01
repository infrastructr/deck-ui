import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromPlaybook from '../reducers/playbook.reducer';

export const playbooksStateSelector = createFeatureSelector<fromPlaybook.PlaybooksState>(fromPlaybook.playbooksFeatureKey);
export const playbooksSelector = createSelector(playbooksStateSelector, (state) => state.playbooksPage?.content);
export const playbooksTotalElementsSelector = createSelector(playbooksStateSelector, (state) => state.playbooksPage?.totalElements);
export const playbooksIsLoadingSelector = createSelector(playbooksStateSelector, (state) => state.isLoading);

export const playbookStateSelector = createFeatureSelector<fromPlaybook.PlaybookState>(fromPlaybook.playbookFeatureKey);
export const playbookSelector = createSelector(playbookStateSelector, (state) => state?.playbook);
export const playbookIsCreateSuccessSelector = createSelector(
  playbookStateSelector, (state) => state?.isCreateSuccess
);
