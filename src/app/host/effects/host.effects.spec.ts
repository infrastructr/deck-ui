import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {HostEffects} from './host.effects';

xdescribe('HostEffects', () => {
  const actions$: Observable<any> = new Observable<any>();
  let effects: HostEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HostEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject<HostEffects>(HostEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
