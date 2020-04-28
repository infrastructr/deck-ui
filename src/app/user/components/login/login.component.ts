import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {UserState} from '../../reducers/user.reducer';
import {login} from '../../actions/user.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private store: Store<UserState>,
  ) {
  }

  ngOnInit(): void {
  }

  submit(f: NgForm): void {
    this.store.dispatch(login(f.value));
  }
}
