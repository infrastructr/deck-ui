import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {select, Store} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {takeUntil} from 'rxjs/operators';
import {groupSelector} from '../../selectors/group.selectors';
import {GroupState} from '../../reducers/group.reducer';
import {getGroup} from '../../actions/group.actions';
import {Group} from '../../models/group';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-group-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  navElements$: BehaviorSubject<NavElement[]>;
  group$: Observable<Group>;
  groupId$: Observable<string>;
  private unsubscribe$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<GroupState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.groupId$ = this.routerStore.select(routeSelectors.selectRouteParam('groupId'))
      .pipe(
        takeUntil(this.unsubscribe$),
      );
    this.groupId$.subscribe((groupId) => {
      if (groupId) {
        this.store.dispatch(getGroup({id: groupId}));
        this.navElements$.next(ViewComponent.getNavElements());
      }
    });

    this.group$ = store.pipe(
      select(groupSelector),
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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
