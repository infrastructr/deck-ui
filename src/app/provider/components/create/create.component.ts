import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreateProviderRequest} from '../../models/create-provider-request';
import {select, Store} from '@ngrx/store';
import {ProviderState} from '../../reducers/provider.reducer';
import {createProvider, resetProvider} from '../../actions/provider.actions';
import {Location} from '@angular/common';
import {ProviderType} from '../../models/provider-type';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {providerIsCreateSuccessSelector} from '../../selectors/provider.selectors';

@Component({
  selector: 'app-provider-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  providerTypes: ProviderType[] = [
    {name: 'GITHUB', title: 'GitHub'},
  ];
  model: CreateProviderRequest;
  private unsubscribe$ = new Subject();
  private isCreateSuccess$: Observable<boolean>;

  constructor(
    private store: Store<ProviderState>,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.model = {} as CreateProviderRequest;

    this.isCreateSuccess$ = this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(providerIsCreateSuccessSelector),
    );

    this.isCreateSuccess$.subscribe(next => {
      if (next) {
        this.store.dispatch(resetProvider());
        this.router.navigate(['../'], {relativeTo: route});
      }
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.store.dispatch(createProvider({request: this.model}));
  }

  navigateBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
