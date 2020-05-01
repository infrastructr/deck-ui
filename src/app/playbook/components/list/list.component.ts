import {Component, OnDestroy, OnInit} from '@angular/core';
import {ColumnDefinitions} from '../../../base/components/data-table/models/column-definitions';
import {SimpleColumnDefinition} from '../../../base/components/data-table/models/simple-column-definition';
import {select, Store} from '@ngrx/store';
import {PlaybooksState} from '../../reducers/playbook.reducer';
import {PlaybookDataSource} from '../../data-sources/playbook-data-source';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';

@Component({
  selector: 'app-playbook-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  navElements$: BehaviorSubject<NavElement[]>;
  projectId$: Observable<string>;
  dataSource: PlaybookDataSource;
  columnDefinitions: ColumnDefinitions = new ColumnDefinitions([
    new SimpleColumnDefinition('name', 'Name'),
    new SimpleColumnDefinition('description', 'Description'),
  ]);
  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<PlaybooksState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.projectId$ = this.routerStore.pipe(
      takeUntil(this.unsubscribe$),
      select(routeSelectors.selectRouteParam('projectId'))
    );
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Inventories',
        icon: 'filter_none',
        routerLink: ['../inventories'],
      },
      {
        name: 'Playbooks',
        icon: 'theaters',
        routerLink: ['./'],
      },
    ];
  }

  ngOnInit(): void {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.navElements$.next(ListComponent.getNavElements());
    this.projectId$.subscribe((projectId) => {
      this.dataSource = new PlaybookDataSource(this.store, {projectId});
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
