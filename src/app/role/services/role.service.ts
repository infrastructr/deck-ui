import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Page} from '../../base/models/page';
import {Observable} from 'rxjs';
import {Pageable} from '../../base/models/pageable';
import {Role} from '../models/role';
import {CreateRoleRequest} from '../models/create-role-request';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(playbookId: string, pageable: Pageable): Observable<Page<Role>> {
    const params = new HttpParams()
      .set('page', String(pageable.pageIndex))
      .set('size', String(pageable.pageSize))
      .set('filter', pageable.filter);

    return this.http.get<Page<Role>>(`${environment.baseUrl}/playbooks/${playbookId}/roles`, {params});
  }

  getById(id: string): Observable<Page<Role>> {
    return this.http.get<Page<Role>>(`${environment.baseUrl}/roles/${id}`);
  }

  create(playbookId: string, request: CreateRoleRequest): Observable<Role> {
    return this.http.post<Role>(`${environment.baseUrl}/playbooks/${playbookId}/roles`, request);
  }
}
