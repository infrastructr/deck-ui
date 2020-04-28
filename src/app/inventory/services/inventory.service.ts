import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Page} from '../../base/models/page';
import {Observable} from 'rxjs';
import {Pageable} from '../../base/models/pageable';
import {Inventory} from '../models/inventory';
import {CreateInventoryRequest} from '../models/create-inventory-request';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(projectId: string, pageable: Pageable): Observable<Page<Inventory>> {
    const params = new HttpParams()
      .set('page', String(pageable.pageIndex))
      .set('size', String(pageable.pageSize))
      .set('filter', pageable.filter);

    return this.http.get<Page<Inventory>>(`${environment.baseUrl}/projects/${projectId}/inventories`, {params});
  }

  getById(id: string): Observable<Page<Inventory>> {
    return this.http.get<Page<Inventory>>(`${environment.baseUrl}/inventories/${id}`);
  }

  create(projectId: string, request: CreateInventoryRequest): Observable<Inventory> {
    return this.http.post<Inventory>(`${environment.baseUrl}/projects/${projectId}/inventories`, request);
  }
}
