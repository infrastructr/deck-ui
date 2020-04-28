import {Provider} from '../models/provider';
import {Store} from '@ngrx/store';
import {ProvidersState} from '../reducers/provider.reducer';
import {getProviders} from '../actions/provider.actions';
import {providersIsLoadingSelector, providersSelector, providersTotalElementsSelector} from '../selectors/provider.selectors';
import {RxDataSource} from '../../base/datasources/rx-data-source';

export class ProviderDatasource extends RxDataSource<Provider, ProvidersState> {

  constructor(
    store: Store<ProvidersState>,
  ) {
    super(
      store,
      providersIsLoadingSelector,
      providersTotalElementsSelector,
      providersSelector,
      getProviders
    );
  }
}
