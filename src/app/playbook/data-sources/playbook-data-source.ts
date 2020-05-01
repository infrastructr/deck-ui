import {Playbook} from '../models/playbook';
import {Store} from '@ngrx/store';
import {getPlaybooks} from '../actions/playbook.actions';
import {RxDataSource} from '../../base/datasources/rx-data-source';
import {PlaybooksState} from '../reducers/playbook.reducer';
import {playbooksIsLoadingSelector, playbooksSelector, playbooksTotalElementsSelector} from '../selectors/playbook.selectors';

export class PlaybookDataSource extends RxDataSource<Playbook, PlaybooksState> {

  constructor(
    store: Store<PlaybooksState>,
    params: { [key: string]: string; } = {},
  ) {
    super(
      store,
      playbooksIsLoadingSelector,
      playbooksTotalElementsSelector,
      playbooksSelector,
      getPlaybooks,
      params,
    );
  }
}
