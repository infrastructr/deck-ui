import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {select, Store} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {takeUntil} from 'rxjs/operators';
import {roleSelector} from '../../selectors/role.selectors';
import {RoleState} from '../../reducers/role.reducer';
import {getRole} from '../../actions/role.actions';
import {Role} from '../../models/role';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-role-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  navElements$: BehaviorSubject<NavElement[]>;
  role$: Observable<Role>;
  roleId$: Observable<string>;
  private unsubscribe$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<RoleState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.roleId$ = this.routerStore.select(routeSelectors.selectRouteParam('roleId'))
      .pipe(
        takeUntil(this.unsubscribe$),
      );
    this.roleId$.subscribe((roleId) => {
      if (roleId) {
        this.store.dispatch(getRole({id: roleId}));
        this.navElements$.next(ViewComponent.getNavElements());
      }
    });

    this.role$ = store.pipe(
      select(roleSelector),
    );
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Roles',
        icon: 'description',
        routerLink: ['../'],
      },
      {
        name: 'Vars',
        icon: 'assessment',
        routerLink: ['../../vars'],
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
