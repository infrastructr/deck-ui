import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {GroupEffects} from './group.effects';

xdescribe('GroupEffects', () => {
  const actions$ = new Observable<any>();
  let effects: GroupEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject<GroupEffects>(GroupEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
