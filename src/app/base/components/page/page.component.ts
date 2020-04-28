import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import {selectRouteTitle} from '../../../routes/selectors/route-selectors';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input()
  page;
  @Input()
  nav;
  title$;

  constructor(
    private routerStore: Store<RouterReducerState>,
  ) {
    this.title$ = routerStore.select(selectRouteTitle);
  }

  ngOnInit(): void {
  }
}
