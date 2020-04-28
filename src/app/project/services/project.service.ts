import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Project} from '../models/project';
import {environment} from '../../../environments/environment';
import {Page} from '../../base/models/page';
import {Observable} from 'rxjs';
import {CreateProjectRequest} from '../models/create-project-request';
import {Pageable} from '../../base/models/pageable';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(pageable: Pageable): Observable<Page<Project>> {
    const params = new HttpParams()
      .set('page', String(pageable.pageIndex))
      .set('size', String(pageable.pageSize))
      .set('filter', pageable.filter);

    return this.http.get<Page<Project>>(`${environment.baseUrl}/projects`, {params});
  }

  getById(id: string): Observable<Page<Project>> {
    return this.http.get<Page<Project>>(`${environment.baseUrl}/projects/${id}`);
  }

  create(request: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(`${environment.baseUrl}/projects`, request);
  }
}
