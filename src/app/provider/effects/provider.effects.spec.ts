import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {ProviderEffects} from './provider.effects';

xdescribe('ProviderEffects', () => {
  const actions$ = new Observable<any>();
  let effects: ProviderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject<ProviderEffects>(ProviderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
