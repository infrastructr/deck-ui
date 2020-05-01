import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {select, Store} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {takeUntil} from 'rxjs/operators';
import {playbookSelector} from '../../selectors/playbook.selectors';
import {PlaybookState} from '../../reducers/playbook.reducer';
import {getPlaybook} from '../../actions/playbook.actions';
import {Playbook} from '../../models/playbook';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-playbook-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  navElements$: BehaviorSubject<NavElement[]>;
  playbook$: Observable<Playbook>;
  playbookId$: Observable<string>;
  private unsubscribe$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<PlaybookState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.playbookId$ = this.routerStore.select(routeSelectors.selectRouteParam('playbookId'))
      .pipe(
        takeUntil(this.unsubscribe$),
      );
    this.playbookId$.subscribe((playbookId) => {
      if (playbookId) {
        this.store.dispatch(getPlaybook({id: playbookId}));
        this.navElements$.next(ViewComponent.getNavElements());
      }
    });

    this.playbook$ = store.pipe(
      select(playbookSelector),
    );
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Roles',
        icon: 'memory',
        routerLink: ['roles'],
      },
      {
        name: 'Vars',
        icon: 'layers',
        routerLink: ['vars'],
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
