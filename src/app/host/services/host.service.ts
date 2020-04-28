import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Page} from '../../base/models/page';
import {Observable} from 'rxjs';
import {Pageable} from '../../base/models/pageable';
import {Host} from '../models/host';
import {CreateHostRequest} from '../models/create-host-request';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(inventoryId: string, pageable: Pageable): Observable<Page<Host>> {
    const params = new HttpParams()
      .set('page', String(pageable.pageIndex))
      .set('size', String(pageable.pageSize))
      .set('filter', pageable.filter);

    return this.http.get<Page<Host>>(`${environment.baseUrl}/inventories/${inventoryId}/hosts`, {params});
  }

  getById(id: string): Observable<Page<Host>> {
    return this.http.get<Page<Host>>(`${environment.baseUrl}/hosts/${id}`);
  }

  create(inventoryId: string, request: CreateHostRequest): Observable<Host> {
    return this.http.post<Host>(`${environment.baseUrl}/inventories/${inventoryId}/hosts`, request);
  }

  initById(id: string): Observable<Host> {
    return this.http.post<Host>(`${environment.baseUrl}/hosts/${id}/init`, null);
  }
}
