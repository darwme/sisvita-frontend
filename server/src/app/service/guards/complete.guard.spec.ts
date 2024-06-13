import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { completeGuard } from './complete.guard';

describe('completeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => completeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
