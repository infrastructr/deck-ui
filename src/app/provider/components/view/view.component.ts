import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {select, Store} from '@ngrx/store';
import {ProviderState} from '../../reducers/provider.reducer';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Provider} from '../../models/provider';
import {providerSelector} from '../../selectors/provider.selectors';
import {getProvider} from '../../actions/provider.actions';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-provider-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  navElements$: BehaviorSubject<NavElement[]>;
  provider$: Observable<Provider>;
  providerId$: Observable<string>;
  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<ProviderState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.providerId$ = this.routerStore.select(routeSelectors.selectRouteParam('providerId'));
    this.providerId$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((providerId) => {
      if (providerId) {
        this.store.dispatch(getProvider({id: providerId}));
        this.navElements$.next(ViewComponent.getNavElements());
      }
    });
    this.provider$ = store.pipe(
      select(providerSelector),
    );
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Hosts',
        icon: 'memory',
        routerLink: ['hosts'],
      },
      {
        name: 'Groups',
        icon: 'layers',
        routerLink: ['groups'],
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
