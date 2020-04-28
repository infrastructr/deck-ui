import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavElement} from '../../../base/components/side-nav/models/nav-element';
import {select, Store} from '@ngrx/store';
import {ProjectState} from '../../reducers/project.reducer';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Project} from '../../models/project';
import {projectSelector} from '../../selectors/project.selectors';
import {getProject} from '../../actions/project.actions';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-project-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  navElements$: BehaviorSubject<NavElement[]>;
  project$: Observable<Project>;
  projectId$: Observable<string>;
  private unsubscribe$ = new Subject();

  constructor(
    private store: Store<ProjectState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.navElements$ = new BehaviorSubject<NavElement[]>([]);
    this.projectId$ = this.routerStore.select(routeSelectors.selectRouteParam('projectId'));
    this.projectId$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((projectId) => {
      if (projectId) {
        this.store.dispatch(getProject({id: projectId}));
        this.navElements$.next(ViewComponent.getNavElements());
      }
    });
    this.project$ = store.pipe(
      select(projectSelector),
    );
  }

  private static getNavElements(): NavElement[] {
    return [
      {
        name: 'Inventories',
        icon: 'memory',
        routerLink: ['inventories'],
      },
      {
        name: 'Playbooks',
        icon: 'layers',
        routerLink: ['playbooks'],
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
