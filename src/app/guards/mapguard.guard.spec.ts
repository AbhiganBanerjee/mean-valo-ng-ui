import { TestBed } from '@angular/core/testing';

import { MapguardGuard } from './mapguard.guard';

describe('MapguardGuard', () => {
  let guard: MapguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MapguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
