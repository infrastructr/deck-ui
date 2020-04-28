import {Host} from '../models/host';
import {Store} from '@ngrx/store';
import {getHosts} from '../actions/host.actions';
import {RxDataSource} from '../../base/datasources/rx-data-source';
import {HostsState} from '../reducers/host.reducer';
import {hostsIsLoadingSelector, hostsSelector, hostsTotalElementsSelector} from '../selectors/host.selectors';

export class HostDataSource extends RxDataSource<Host, HostsState> {

  constructor(
    store: Store<HostsState>,
    params: { [key: string]: string; } = {},
  ) {
    super(
      store,
      hostsIsLoadingSelector,
      hostsTotalElementsSelector,
      hostsSelector,
      getHosts,
      params,
    );
  }
}
