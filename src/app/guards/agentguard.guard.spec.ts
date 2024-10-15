import { TestBed } from '@angular/core/testing';

import { AgentguardGuard } from './agentguard.guard';

describe('AgentguardGuard', () => {
  let guard: AgentguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AgentguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
