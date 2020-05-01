import {Role} from '../models/role';
import {Store} from '@ngrx/store';
import {getRoles} from '../actions/role.actions';
import {RxDataSource} from '../../base/datasources/rx-data-source';
import {RolesState} from '../reducers/role.reducer';
import {rolesIsLoadingSelector, rolesSelector, rolesTotalElementsSelector} from '../selectors/role.selectors';

export class RoleDataSource extends RxDataSource<Role, RolesState> {

  constructor(
    store: Store<RolesState>,
    params: { [key: string]: string; } = {},
  ) {
    super(
      store,
      rolesIsLoadingSelector,
      rolesTotalElementsSelector,
      rolesSelector,
      getRoles,
      params,
    );
  }
}
