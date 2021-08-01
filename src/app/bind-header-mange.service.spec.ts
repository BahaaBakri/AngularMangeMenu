import { TestBed } from '@angular/core/testing';

import { BindHeaderMangeService } from './bind-header-mange.service';

describe('BindHeaderMangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BindHeaderMangeService = TestBed.get(BindHeaderMangeService);
    expect(service).toBeTruthy();
  });
});
