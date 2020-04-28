import {Component, OnInit} from '@angular/core';
import {ProjectDataSource} from '../../datasources/project-datasource';
import {ProjectsState} from '../../reducers/project.reducer';
import {Store} from '@ngrx/store';
import {SimpleColumnDefinition} from '../../../base/components/data-table/models/simple-column-definition';
import {ColumnDefinitions} from '../../../base/components/data-table/models/column-definitions';
import {AdvancedColumnDefinition} from '../../../base/components/data-table/models/advanced-column-definition';
import {Reference} from '../../../base/models/reference';

@Component({
  selector: 'app-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: ProjectDataSource;
  columnDefinitions: ColumnDefinitions = new ColumnDefinitions([
    new SimpleColumnDefinition('name', 'Name'),
    new SimpleColumnDefinition('description', 'Description'),
    new AdvancedColumnDefinition('owner', 'Owner', (value: Reference) => (value.name)),
    new AdvancedColumnDefinition('author', 'Author', (value: Reference) => (value.name)),
  ]);

  constructor(
    private store: Store<ProjectsState>
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new ProjectDataSource(this.store);
  }
}
