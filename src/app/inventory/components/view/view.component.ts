import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {select, Store} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {takeUntil} from 'rxjs/operators';
import {inventorySelector} from '../../selectors/inventory.selectors';
import {InventoryState} from '../../reducers/inventory.reducer';
import {getInventory} from '../../actions/inventory.actions';
import {Inventory} from '../../models/inventory';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  navElements$: BehaviorSubject<NavElement[]>;
  inventory$: Observable<Inventory>;
  inventoryId$: Observable<string>;
  private unsubscribe$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<InventoryState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.inventoryId$ = this.routerStore.select(routeSelectors.selectRouteParam('inventoryId'))
      .pipe(
        takeUntil(this.unsubscribe$),
      );
    this.inventoryId$.subscribe((inventoryId) => {
      if (inventoryId) {
        this.store.dispatch(getInventory({id: inventoryId}));
        this.navElements$.next(ViewComponent.getNavElements());
      }
    });

    this.inventory$ = store.pipe(
      select(inventorySelector),
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
