import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreatePlaybookRequest} from '../../models/create-playbook-request';
import {select, Store} from '@ngrx/store';
import {PlaybooksState} from '../../reducers/playbook.reducer';
import {createPlaybook, resetPlaybook} from '../../actions/playbook.actions';
import {Location} from '@angular/common';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {RouterReducerState} from '@ngrx/router-store';
import {takeUntil} from 'rxjs/operators';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {Form} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {playbookIsCreateSuccessSelector} from '../../selectors/playbook.selectors';

@Component({
  selector: 'app-playbook-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  navElements$: BehaviorSubject<NavElement[]>;
  projectId$: Observable<string>;
  model: CreatePlaybookRequest;
  private unsubscribe$ = new Subject();
  private isSubmit$ = new BehaviorSubject<boolean>(false);
  private submitRequirements: Observable<any>[];
  private isCreateSuccess$: Observable<boolean>;

  constructor(
    private store: Store<PlaybooksState>,
    private location: Location,
    private routerStore: Store<RouterReducerState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.model = {} as CreatePlaybookRequest;
    this.projectId$ = this.routerStore.pipe(
      takeUntil(this.unsubscribe$),
      select(routeSelectors.selectRouteParam('projectId'))
    );
    this.isCreateSuccess$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(playbookIsCreateSuccessSelector),
    );

    this.submitRequirements = [this.isSubmit$, this.projectId$];
    combineLatest(this.submitRequirements).subscribe(
      result => {
        const [isSubmit, projectId] = result;
        if (isSubmit && projectId) {
          this.store.dispatch(createPlaybook({request: this.model, params: {projectId}}));
          this.isSubmit$.next(false);
        }
      });

    this.isCreateSuccess$.subscribe(next => {
      if (next) {
        this.store.dispatch(resetPlaybook());
        this.router.navigate(['../'], {relativeTo: route});
      }
    });
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Inventories',
        icon: 'filter_none',
        routerLink: ['../../inventories'],
      },
      {
        name: 'Playbooks',
        icon: 'theaters',
        routerLink: ['../'],
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
