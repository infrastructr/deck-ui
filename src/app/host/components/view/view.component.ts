import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {select, Store} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {takeUntil} from 'rxjs/operators';
import {hostSelector} from '../../selectors/host.selectors';
import {HostState} from '../../reducers/host.reducer';
import {getHost} from '../../actions/host.actions';
import {Host} from '../../models/host';
import {MatDialog} from '@angular/material/dialog';
import {InitComponent} from '../init/init.component';
import {HostInit} from '../../models/host-init';

@Component({
  selector: 'app-host-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  navElements$: BehaviorSubject<NavElement[]>;
  host$: Observable<Host>;
  hostId$: Observable<string>;
  private unsubscribe$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<HostState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.hostId$ = this.routerStore.select(routeSelectors.selectRouteParam('hostId'))
      .pipe(
        takeUntil(this.unsubscribe$),
      );
    this.hostId$.subscribe((hostId) => {
      if (hostId) {
        this.store.dispatch(getHost({id: hostId}));
        this.navElements$.next(ViewComponent.getNavElements());
      }
    });

    this.host$ = store.pipe(
      select(hostSelector),
    );
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Hosts',
        icon: 'memory',
        routerLink: ['../'],
      },
      {
        name: 'Groups',
        icon: 'layers',
        routerLink: ['../../groups'],
      },
    ];
  }

  showInit(): void {
    const initDialogRef = this.dialog.open(InitComponent, {
      width: 'auto',
      data: {token: 'this.name', command: 'this.animal'} as HostInit
    });

    initDialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
