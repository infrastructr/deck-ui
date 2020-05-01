import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Page} from '../../base/models/page';
import {Observable} from 'rxjs';
import {Pageable} from '../../base/models/pageable';
import {Playbook} from '../models/playbook';
import {CreatePlaybookRequest} from '../models/create-playbook-request';

@Injectable({
  providedIn: 'root'
})
export class PlaybookService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(projectId: string, pageable: Pageable): Observable<Page<Playbook>> {
    const params = new HttpParams()
      .set('page', String(pageable.pageIndex))
      .set('size', String(pageable.pageSize))
      .set('filter', pageable.filter);

    return this.http.get<Page<Playbook>>(`${environment.baseUrl}/projects/${projectId}/playbooks`, {params});
  }

  getById(id: string): Observable<Page<Playbook>> {
    return this.http.get<Page<Playbook>>(`${environment.baseUrl}/playbooks/${id}`);
  }

  create(projectId: string, request: CreatePlaybookRequest): Observable<Playbook> {
    return this.http.post<Playbook>(`${environment.baseUrl}/projects/${projectId}/playbooks`, request);
  }
}
