import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {HostEffects} from './host.effects';

xdescribe('HostEffects', () => {
  let actions$: Observable<any>;
  let effects: HostEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HostEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<HostEffects>(HostEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
