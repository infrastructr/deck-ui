import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreateInventoryRequest} from '../../models/create-inventory-request';
import {select, Store} from '@ngrx/store';
import {InventoriesState} from '../../reducers/inventory.reducer';
import {createInventory, resetInventory} from '../../actions/inventory.actions';
import {Location} from '@angular/common';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {RouterReducerState} from '@ngrx/router-store';
import {takeUntil} from 'rxjs/operators';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {Form} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {inventoryIsCreateSuccessSelector} from '../../selectors/inventory.selectors';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  navElements$: BehaviorSubject<NavElement[]>;
  projectId$: Observable<string>;
  model: CreateInventoryRequest;
  private unsubscribe$ = new Subject();
  private isSubmit$ = new BehaviorSubject<boolean>(false);
  private submitRequirements: Observable<any>[];
  private isCreateSuccess$: Observable<boolean>;

  constructor(
    private store: Store<InventoriesState>,
    private location: Location,
    private routerStore: Store<RouterReducerState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.model = {} as CreateInventoryRequest;
    this.projectId$ = this.routerStore.pipe(
      takeUntil(this.unsubscribe$),
      select(routeSelectors.selectRouteParam('projectId'))
    );
    this.isCreateSuccess$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(inventoryIsCreateSuccessSelector),
    );

    this.submitRequirements = [this.isSubmit$, this.projectId$];
    combineLatest(this.submitRequirements).subscribe(
      result => {
        const [isSubmit, projectId] = result;
        if (isSubmit && projectId) {
          this.store.dispatch(createInventory({request: this.model, params: {projectId}}));
          this.isSubmit$.next(false);
        }
      });

    this.isCreateSuccess$.subscribe(next => {
      if (next) {
        this.store.dispatch(resetInventory());
        this.router.navigate(['../'], {relativeTo: route});
      }
    });
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Inventories',
        icon: 'memory',
        routerLink: ['../'],
      },
      {
        name: 'Playbooks',
        icon: 'layers',
        routerLink: ['../../playbooks'],
      },
    ];
  }

  ngOnInit(): void {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.navElements$.next(CreateComponent.getNavElements());
  }

  submit(f: Form): void {
    this.isSubmit$.next(true);
  }

  navigateBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
