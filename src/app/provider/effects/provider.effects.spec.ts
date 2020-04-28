import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {ProviderEffects} from './provider.effects';

describe('ProviderEffects', () => {
  let actions$: Observable<any>;
  let effects: ProviderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ProviderEffects>(ProviderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
