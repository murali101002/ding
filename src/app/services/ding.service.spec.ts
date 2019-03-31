import { TestBed } from '@angular/core/testing';

import { DingService } from './ding.service';

describe('DingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DingService = TestBed.get(DingService);
    expect(service).toBeTruthy();
  });
});
