import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DefaultProjectorFn, MemoizedSelector, select, Store} from '@ngrx/store';
import {Pageable} from '../models/pageable';
import {ActionCreator, TypedAction} from '@ngrx/store/src/models';
import {takeUntil} from 'rxjs/operators';

export class RxDataSource<T, S> implements DataSource<T> {
  readonly isLoading$: Observable<boolean>;
  readonly totalElements: Observable<number>;
  private unsubscribe$ = new Subject();
  private dataSubject$ = new BehaviorSubject<T[]>([]);

  constructor(
    private store: Store<S>,
    private isLoadingSelector: MemoizedSelector<S, boolean, DefaultProjectorFn<boolean>>,
    private totalElementsSelector: MemoizedSelector<S, number, DefaultProjectorFn<number>>,
    private dataSelector: MemoizedSelector<S, T[], DefaultProjectorFn<T[]>>,
    private retrieveDataAction: ActionCreator<string, any & TypedAction<string>>,
    private retrieveDataParams: { [key: string]: string; } = {},
  ) {
    this.isLoading$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(isLoadingSelector),
    );

    this.totalElements = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(totalElementsSelector),
    );

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(dataSelector),
    ).subscribe(this.dataSubject$);

    this.isLoading$.subscribe(isLoading => {
      if (isLoading) {
        this.dataSubject$.next([]);
      }
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject$.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadData(filter = '', sortDirection = 'asc', pageIndex = 0, pageSize = 5) {
    const pageable = {
      filter,
      pageIndex,
      pageSize,
      sortDirection,
    } as Pageable;
    this.store.dispatch(this.retrieveDataAction({pageable, params: this.retrieveDataParams}));
  }
}
