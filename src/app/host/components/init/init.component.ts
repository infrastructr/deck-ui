import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HostInit} from '../../models/host-init';
import {Store} from '@ngrx/store';
import {HostInitState} from '../../reducers/host.reducer';
import {Observable, Subject} from 'rxjs';
import {hostInitSelector} from '../../selectors/host.selectors';
import {takeUntil} from 'rxjs/operators';
import {initHost} from '../../actions/host.actions';
import {RouterReducerState} from '@ngrx/router-store';
import * as routeSelectors from '../../../routes/selectors/route-selectors';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent {
  hostInit$: Observable<HostInit>;
  private unsubscribe$ = new Subject();
  private hostId$: Observable<string>;

  constructor(
    public dialogRef: MatDialogRef<InitComponent>,
    private store: Store<HostInitState>,
    private routerStore: Store<RouterReducerState>,
  ) {
    this.hostId$ = this.routerStore.select(routeSelectors.selectRouteParam('hostId'))
      .pipe(
        takeUntil(this.unsubscribe$),
      );
    this.hostInit$ = store.select(hostInitSelector).pipe(
      takeUntil(this.unsubscribe$),
    );
    this.hostId$.subscribe((hostId) => {
      if (hostId) {
        this.store.dispatch(initHost({id: hostId}));
      }
    });
  }

  close(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.dialogRef.close();
  }
}
