import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Page} from '../../base/models/page';
import {Observable} from 'rxjs';
import {Pageable} from '../../base/models/pageable';
import {Group} from '../models/group';
import {CreateGroupRequest} from '../models/create-group-request';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(inventoryId: string, pageable: Pageable): Observable<Page<Group>> {
    const params = new HttpParams()
      .set('page', String(pageable.pageIndex))
      .set('size', String(pageable.pageSize))
      .set('filter', pageable.filter);

    return this.http.get<Page<Group>>(`${environment.baseUrl}/inventories/${inventoryId}/groups`, {params});
  }

  getById(id: string): Observable<Page<Group>> {
    return this.http.get<Page<Group>>(`${environment.baseUrl}/groups/${id}`);
  }

  create(inventoryId: string, request: CreateGroupRequest): Observable<Group> {
    return this.http.post<Group>(`${environment.baseUrl}/inventories/${inventoryId}/groups`, request);
  }
}
