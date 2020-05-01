import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRole from '../reducers/role.reducer';

export const rolesStateSelector = createFeatureSelector<fromRole.RolesState>(fromRole.rolesFeatureKey);
export const rolesSelector = createSelector(rolesStateSelector, (state) => state.rolesPage?.content);
export const rolesTotalElementsSelector = createSelector(rolesStateSelector, (state) => state.rolesPage?.totalElements);
export const rolesIsLoadingSelector = createSelector(rolesStateSelector, (state) => state.isLoading);

export const roleStateSelector = createFeatureSelector<fromRole.RoleState>(fromRole.roleFeatureKey);
export const roleSelector = createSelector(roleStateSelector, (state) => state?.role);
export const roleIsCreateSuccessSelector = createSelector(roleStateSelector, (state) => state?.isCreateSuccess);
