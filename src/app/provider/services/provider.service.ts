import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Provider} from '../models/provider';
import {environment} from '../../../environments/environment';
import {Page} from '../../base/models/page';
import {Observable} from 'rxjs';
import {CreateProviderRequest} from '../models/create-provider-request';
import {Pageable} from '../../base/models/pageable';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(pageable: Pageable): Observable<Page<Provider>> {
    const params = new HttpParams()
      .set('page', String(pageable.pageIndex))
      .set('size', String(pageable.pageSize))
      .set('filter', pageable.filter);

    return this.http.get<Page<Provider>>(`${environment.baseUrl}/providers`, {params});
  }

  getById(id: string): Observable<Page<Provider>> {
    return this.http.get<Page<Provider>>(`${environment.baseUrl}/providers/${id}`);
  }

  create(request: CreateProviderRequest): Observable<Provider> {
    return this.http.post<Provider>(`${environment.baseUrl}/providers`, request);
  }
}
