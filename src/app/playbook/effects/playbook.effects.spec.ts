import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {PlaybookEffects} from './playbook.effects';

xdescribe('PlaybookEffects', () => {
  const actions$ = new Observable<any>();
  let effects: PlaybookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlaybookEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject<PlaybookEffects>(PlaybookEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
