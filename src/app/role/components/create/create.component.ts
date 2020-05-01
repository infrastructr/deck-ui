import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreateRoleRequest} from '../../models/create-role-request';
import {select, Store} from '@ngrx/store';
import {RoleState} from '../../reducers/role.reducer';
import {createRole, resetRole} from '../../actions/role.actions';
import {Location} from '@angular/common';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {RouterReducerState} from '@ngrx/router-store';
import {takeUntil} from 'rxjs/operators';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {Form} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {roleIsCreateSuccessSelector} from '../../selectors/role.selectors';

@Component({
  selector: 'app-role-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  navElements$: BehaviorSubject<NavElement[]>;
  playbookId$: Observable<string>;
  model: CreateRoleRequest;
  private unsubscribe$ = new Subject();
  private isSubmit$ = new BehaviorSubject<boolean>(false);
  private submitRequirements: Observable<any>[];
  private isCreateSuccess$: Observable<boolean>;

  constructor(
    private store: Store<RoleState>,
    private location: Location,
    private routerStore: Store<RouterReducerState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.model = {} as CreateRoleRequest;
    this.playbookId$ = this.routerStore.pipe(
      takeUntil(this.unsubscribe$),
      select(routeSelectors.selectRouteParam('playbookId'))
    );
    this.isCreateSuccess$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(roleIsCreateSuccessSelector),
    );

    this.submitRequirements = [this.isSubmit$, this.playbookId$];
    combineLatest(this.submitRequirements).subscribe(
      next => {
        const [isSubmit, playbookId] = next;
        if (isSubmit && playbookId) {
          this.store.dispatch(createRole({request: this.model, params: {playbookId: playbookId}}));
          this.isSubmit$.next(false);
        }
      });

    this.isCreateSuccess$.subscribe(next => {
      if (next) {
        this.store.dispatch(resetRole());
        this.router.navigate(['../'], {relativeTo: route});
      }
    });
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
