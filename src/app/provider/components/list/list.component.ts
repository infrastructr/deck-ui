import {Component, OnInit} from '@angular/core';
import {ProviderDatasource} from '../../datasources/provider-datasource';
import {ProvidersState} from '../../reducers/provider.reducer';
import {Store} from '@ngrx/store';
import {SimpleColumnDefinition} from '../../../base/components/data-table/models/simple-column-definition';
import {ColumnDefinitions} from '../../../base/components/data-table/models/column-definitions';
import {AdvancedColumnDefinition} from '../../../base/components/data-table/models/advanced-column-definition';
import {Reference} from '../../../base/models/reference';

@Component({
  selector: 'app-provider-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: ProviderDatasource;
  columnDefinitions: ColumnDefinitions = new ColumnDefinitions([
    new SimpleColumnDefinition('name', 'Name'),
    new SimpleColumnDefinition('description', 'Description'),
    new SimpleColumnDefinition('type', 'Type'),
    new AdvancedColumnDefinition('owner', 'Owner', (value: Reference) => (value.name)),
  ]);

  constructor(
    private store: Store<ProvidersState>
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new ProviderDatasource(this.store);
  }
}
