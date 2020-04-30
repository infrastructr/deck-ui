import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreateGroupRequest} from '../../models/create-group-request';
import {select, Store} from '@ngrx/store';
import {GroupState} from '../../reducers/group.reducer';
import {createGroup, resetGroup} from '../../actions/group.actions';
import {Location} from '@angular/common';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {RouterReducerState} from '@ngrx/router-store';
import {takeUntil} from 'rxjs/operators';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {Form} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {groupIsCreateSuccessSelector} from '../../selectors/group.selectors';

@Component({
  selector: 'app-group-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  navElements$: BehaviorSubject<NavElement[]>;
  inventoryId$: Observable<string>;
  model: CreateGroupRequest;
  private unsubscribe$ = new Subject();
  private isSubmit$ = new BehaviorSubject<boolean>(false);
  private submitRequirements: Observable<any>[];
  private isCreateSuccess$: Observable<boolean>;

  constructor(
    private store: Store<GroupState>,
    private location: Location,
    private routerStore: Store<RouterReducerState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.model = {} as CreateGroupRequest;
    this.inventoryId$ = this.routerStore.pipe(
      takeUntil(this.unsubscribe$),
      select(routeSelectors.selectRouteParam('inventoryId'))
    );
    this.isCreateSuccess$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(groupIsCreateSuccessSelector),
    );

    this.submitRequirements = [this.isSubmit$, this.inventoryId$];
    combineLatest(this.submitRequirements).subscribe(
      next => {
        const [isSubmit, inventoryId] = next;
        if (isSubmit && inventoryId) {
          this.store.dispatch(createGroup({request: this.model, params: {inventoryId}}));
          this.isSubmit$.next(false);
        }
      });

    this.isCreateSuccess$.subscribe(next => {
      if (next) {
        this.store.dispatch(resetGroup());
        this.router.navigate(['../'], {relativeTo: route});
      }
    });
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
