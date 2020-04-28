import {Project} from '../models/project';
import {Store} from '@ngrx/store';
import {ProjectsState} from '../reducers/project.reducer';
import {getProjects} from '../actions/project.actions';
import {projectsIsLoadingSelector, projectsSelector, projectsTotalElementsSelector} from '../selectors/project.selectors';
import {RxDataSource} from '../../base/datasources/rx-data-source';

export class ProjectDataSource extends RxDataSource<Project, ProjectsState> {

  constructor(
    store: Store<ProjectsState>,
  ) {
    super(
      store,
      projectsIsLoadingSelector,
      projectsTotalElementsSelector,
      projectsSelector,
      getProjects
    );
  }
}
