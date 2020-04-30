import {Group} from '../models/group';
import {Store} from '@ngrx/store';
import {getGroups} from '../actions/group.actions';
import {RxDataSource} from '../../base/datasources/rx-data-source';
import {GroupsState} from '../reducers/group.reducer';
import {groupsIsLoadingSelector, groupsSelector, groupsTotalElementsSelector} from '../selectors/group.selectors';

export class GroupDataSource extends RxDataSource<Group, GroupsState> {

  constructor(
    store: Store<GroupsState>,
    params: { [key: string]: string; } = {},
  ) {
    super(
      store,
      groupsIsLoadingSelector,
      groupsTotalElementsSelector,
      groupsSelector,
      getGroups,
      params,
    );
  }
}
