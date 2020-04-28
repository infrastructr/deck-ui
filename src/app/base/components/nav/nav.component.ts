import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {userSelector} from '../../../user/selectors/user.selectors';
import {UserState} from '../../../user/reducers/user.reducer';
import {logout} from '../../../user/actions/user.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user$: Observable<any>;

  constructor(
    private store: Store<UserState>
  ) {
    this.user$ = store.pipe(
      select(userSelector),
    );
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(logout());
  }
}
