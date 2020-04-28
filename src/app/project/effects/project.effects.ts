import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ProjectService} from '../services/project.service';

import * as ProjectActions from '../actions/project.actions';
import {createProject} from '../actions/project.actions';
import {Router} from '@angular/router';


@Injectable()
export class ProjectEffects {

  getProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.getProjects),
      concatMap(({pageable}) => this.projectService.getAll(pageable)
        .pipe(
          map(data => ProjectActions.getProjectsSuccess({data})),
          catchError(error => of(ProjectActions.getProjectsFailure({error}))))
      )
    );
  });

  createProject$ = createEffect(() => this.actions$.pipe(
    ofType(createProject),
    concatMap(({request}) => this.projectService.create(request)
      .pipe(
        map(data => ProjectActions.createProjectSuccess({data})),
        catchError(error => of(ProjectActions.createProjectFailure({error}))),
      ))
  ));

  getProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.getProject),
      concatMap(({id}) => this.projectService.getById(id)
        .pipe(
          map(data => ProjectActions.getProjectSuccess({data})),
          catchError(error => of(ProjectActions.getProjectFailure({error}))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private projectService: ProjectService
  ) {
  }

}
