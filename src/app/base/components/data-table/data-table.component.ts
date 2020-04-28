import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {RxDataSource} from '../../datasources/rx-data-source';
import {fromEvent, Observable, Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import {ActivatedRoute, Router} from '@angular/router';
import * as routeSelectors from '../../../routes/selectors/route-selectors';
import {debounceTime, delay, distinctUntilChanged, startWith, takeUntil, tap} from 'rxjs/operators';
import {ColumnDefinitions} from './models/column-definitions';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnDestroy {
  @Input()
  dataSource: RxDataSource<any, any>;
  @Input()
  columnDefinitions: ColumnDefinitions;
  page: Observable<string>;
  size: Observable<string>;
  filter: Observable<string>;
  @ViewChild('input') input: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private unsubscribe$ = new Subject();

  constructor(
    private routerStore: Store<RouterReducerState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.page = this.routerStore.select(routeSelectors.selectQueryParam('page'));
    this.size = this.routerStore.select(routeSelectors.selectQueryParam('size'));
    this.filter = this.routerStore.select(routeSelectors.selectQueryParam('filter'));
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.updateQueryParams({
            filter: this.input.nativeElement.value,
          });
          this.loadDataPage();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        takeUntil(this.unsubscribe$),
        startWith(null),
        delay(0),
        tap(() => this.loadDataPage())
      )
      .subscribe(value => {
        if (value) {
          this.updateQueryParams({
            size: value.pageSize,
            page: value.pageIndex,
          });
        }
      });
  }

  loadDataPage() {
    this.dataSource.loadData(
      this.input.nativeElement.value,
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private updateQueryParams(queryParams) {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
