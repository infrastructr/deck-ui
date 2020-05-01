import {Component, OnDestroy, OnInit} from '@angular/core';
import {ColumnDefinitions} from '../../../base/components/data-table/models/column-definitions';
import {SimpleColumnDefinition} from '../../../base/components/data-table/models/simple-column-definition';
import {select, Store} from '@ngrx/store';
import {RolesState} from '../../reducers/role.reducer';
import {RoleDataSource} from '../../data-sources/role-data-source';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  navElements$: BehaviorSubject<NavElement[]>;
  playbookId$: Observable<string>;
  dataSource: RoleDataSource;
  columnDefinitions: ColumnDefinitions = new ColumnDefinitions([
    new SimpleColumnDefinition('name', 'Name'),
    new SimpleColumnDefinition('description', 'Description'),
  ]);
  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<RolesState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.playbookId$ = this.routerStore.pipe(
      takeUntil(this.unsubscribe$),
      select(routeSelectors.selectRouteParam('playbookId'))
    );
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Roles',
        icon: 'description',
        routerLink: ['./'],
      },
      {
        name: 'Vars',
        icon: 'assessment',
        routerLink: ['../vars'],
      },
    ];
  }

  ngOnInit(): void {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.navElements$.next(ListComponent.getNavElements());
    this.playbookId$.subscribe((playbookId) => {
      this.dataSource = new RoleDataSource(this.store, {playbookId});
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
