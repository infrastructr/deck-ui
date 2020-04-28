import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreateProjectRequest} from '../../models/create-project-request';
import {select, Store} from '@ngrx/store';
import {ProjectState} from '../../reducers/project.reducer';
import {createProject, resetProject} from '../../actions/project.actions';
import {Location} from '@angular/common';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {projectIsCreateSuccessSelector} from '../../selectors/project.selectors';

@Component({
  selector: 'app-project-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  model: CreateProjectRequest;
  private unsubscribe$ = new Subject();
  private isCreateSuccess$: Observable<boolean>;

  constructor(
    private store: Store<ProjectState>,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.model = {} as CreateProjectRequest;
    this.isCreateSuccess$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(projectIsCreateSuccessSelector),
    );

    this.isCreateSuccess$.subscribe(next => {
      if (next) {
        this.store.dispatch(resetProject());
        this.router.navigate(['../'], {relativeTo: route});
      }
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.store.dispatch(createProject({request: this.model}));
  }

  navigateBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
