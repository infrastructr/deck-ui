import {Component, OnDestroy, OnInit} from '@angular/core';
import {ColumnDefinitions} from '../../../base/components/data-table/models/column-definitions';
import {SimpleColumnDefinition} from '../../../base/components/data-table/models/simple-column-definition';
import {select, Store} from '@ngrx/store';
import {GroupsState} from '../../reducers/group.reducer';
import {GroupDataSource} from '../../data-sources/group-data-source';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';

@Component({
  selector: 'app-group-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  navElements$: BehaviorSubject<NavElement[]>;
  inventoryId$: Observable<string>;
  dataSource: GroupDataSource;
  columnDefinitions: ColumnDefinitions = new ColumnDefinitions([
    new SimpleColumnDefinition('name', 'Name'),
    new SimpleColumnDefinition('description', 'Description'),
  ]);
  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<GroupsState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.inventoryId$ = this.routerStore.pipe(
      takeUntil(this.unsubscribe$),
      select(routeSelectors.selectRouteParam('inventoryId'))
    );
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Hosts',
        icon: 'memory',
        routerLink: ['../hosts'],
      },
      {
        name: 'Groups',
        icon: 'layers',
        routerLink: ['./'],
      },
    ];
  }

  ngOnInit(): void {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.navElements$.next(ListComponent.getNavElements());
    this.inventoryId$.subscribe((inventoryId) => {
      this.dataSource = new GroupDataSource(this.store, {inventoryId});
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
